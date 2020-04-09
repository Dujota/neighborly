import React, { useState, useMemo } from 'react';
import Provider from '../components/Provider';

// Components
import Listings from '../components/Listings';
import Dashboard from '../components/Dashboard';
import MapBox from '../components/Mapbox';

// Context
import { ListingContext } from './listingContext';

const [id, setId] = useState(null);

const value = useMemo(() => ({id, setId}), [id, setId]);

const Home = () => (
  <Provider>
      <ListingContext.Provider value={value}>
        <section className="map-dashboard-section">
            <Dashboard />
            <MapBox />
        </section>

        <Listings />
      </ListingContext.Provider>
  </Provider>
);

export default Home;