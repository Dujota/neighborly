/* eslint-disable react/display-name */
import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Used for the map itself
import { Map, Marker, TileLayer, Popup } from 'react-leaflet';
// Used when making custom Marker icons
import L, { Icon } from 'leaflet';

// Used to cluster points
import useSupercluster from 'use-supercluster';
import * as parkData from './test_geojson.json';

// Component
import Listing from '../Listing';
import ProcessListingForm from '../Listing/process_listing_form';

const GET_LISTING_INFO = gql`
  {
    selectedListingId @client
    editListing @client
    createListing @client
  }
`;

const cuffs = new L.Icon({
  iconUrl: '/handcuffs.svg',
  iconSize: [25, 25],
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};

export default () => {
  // Set Active Clicked on Marker
  const [activePark, setActivePark] = React.useState(null);

  // state and refs
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(13);
  const mapRef = useRef();
  // GRAPHQL STUFF
  const { data, loading, error } = useQuery(GET_LISTING_INFO);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // load and prepare data
  // get map bounds
  function updateMap() {
    const b = mapRef.current.leafletElement.getBounds();
    setBounds([b.getSouthWest().lng, b.getSouthWest().lat, b.getNorthEast().lng, b.getNorthEast().lat]);

    setActivePark(null);
    setZoom(mapRef.current.leafletElement.getZoom());
  }

  React.useEffect(() => {
    updateMap();
    mapRef.current.leafletElement.invalidateSize(false);
  }, []);

  // get clusters
  const points = parkData.features.map(park => ({ ...park, properties: { cluster: false, ...park.properties } }));
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  // LISTING SHOW STUFF
  if (data.createListing) {
    return <ProcessListingForm addListing={data.createListing} />;
  }

  if (data.editListing) {
    return <Listing listingId={data.selectedListingId} editListing={data.editListing} />;
  }

  if (data.selectedListingId) {
    return <Listing listingId={data.selectedListingId} />;
  }

  // RETURN MAP
  return (
    <Map center={[45.4, -75.7]} zoom={10} onMoveEnd={updateMap} ref={mapRef} id="mapbox-component" className="card">
      <TileLayer
        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}"
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        ext="png"
      />

      {clusters.map(cluster => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a crime point
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(pointCount, 10 + (pointCount / points.length) * 40)}
              onClick={() => {
                const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 17);
                const leaflet = mapRef.current.leafletElement;
                leaflet.setView([latitude, longitude], expansionZoom, {
                  animate: true,
                });
              }}
            />
          );
        }

        // Single Marker
        return (
          <Marker
            key={cluster.properties.PARK_ID}
            position={[latitude, longitude]}
            onClick={() => {
              setActivePark(cluster);
            }}
          />
        );
      })}

      {activePark && (
        <Popup
          position={[activePark.geometry.coordinates[1], activePark.geometry.coordinates[0]]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div className="card">
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};
