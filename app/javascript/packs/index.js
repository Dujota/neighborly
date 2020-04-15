import React, { useEffect } from 'react';
import { render } from 'react-dom';
import { useApolloClient } from 'react-apollo';

// Components
import Provider from '../components/Provider';
// Components
import Listings from '../components/Listings';
import Dashboard from '../components/Dashboard';
import MapBox from '../components/Mapbox';

export default function Home() {
  const client = useApolloClient();

  useEffect(() => {
    const toggleListingCreate = ({ createNewListing }) => {
      client.writeData({ data: { createNewListing } });
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
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#home');

  if (element) {
    render(
      <Provider>
        <Home />
      </Provider>,
      element
    );
  }
});
