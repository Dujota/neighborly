import React, { useState, useMemo } from 'react';


// Components
import Listings from '../components/Listings';
import Dashboard from '../components/Dashboard';
import MapBox from '../components/Mapbox';

// Context
import { ListingContext } from './listingContext';

const [listingId, setListingId] = useState(null);

const value = useMemo(() => ({listingId, setListingId}), [listingId, setListingId]);

const Home = () => (
    <ListingContext.Provider value={value}>
    <section className="map-dashboard-section">
        <Dashboard />
        <MapBox />
    </section>

    <Listings />
    </ListingContext.Provider>
);

export default Home;