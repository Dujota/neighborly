import React, { useEffect } from 'react';

import { useApolloClient } from 'react-apollo';

// Components
import Listings from '../Listings';
import Dashboard from '../Dashboard';
import MapBox from '../Mapbox';

const Home = () => {
  const client = useApolloClient();
  useEffect(() => {
    const toggleListingCreate = ({ createListing }) => {
      client.writeData({ data: { createListing } });
    };
    // debugger;
    // adding event listeners on mount here
    window.EventSystem.subscribe('create.new.listing', toggleListingCreate);
    // debugger;
    // return () => {
    //   // cleaning up the listeners here
    // };
  }, [client]);

  return (
    <>
      <section className="map-dashboard-section">
        <Dashboard />
        <MapBox />
      </section>

      <Listings />
    </>
  );
};

export default Home;
