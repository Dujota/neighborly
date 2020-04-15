/* eslint-disable react/display-name */
import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Component
import Listing from '../Listing';

const GET_LISTING_INFO = gql`
  {
    selectedListingId @client
    edit @client
    createNewListing @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_LISTING_INFO);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  console.log(`createNewListing Value in mapbox: ${data.createNewListing}`);

  // NEED TO FIX THIS -- NEED render the FORM for create
  if (data.createNewListing) {
    return <Listing listingId={data.selectedListingId} createNewListing={data.createNewListing} />;
  }

  if (data.edit) {
    return <Listing listingId={data.selectedListingId} edit={data.edit} />;
  }

  if (data.selectedListingId) {
    return <Listing listingId={data.selectedListingId} />;
  }

  return (
    <article id="mapbox-component" className="card">
      MAPBOX COMPONENT
    </article>
  );
};
