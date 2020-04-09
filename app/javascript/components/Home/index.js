import React, { useState, useMemo } from 'react';


// Components
import Listings from '../Listings';
import Dashboard from '../Dashboard';
import MapBox from '../Mapbox';

// Context
import { ListingContext } from './listingContext';

const Home = () => {
    const [listingId, setListingId] = useState(1);

    const value = useMemo(() => ({listingId, setListingId}), [listingId, setListingId]);    
    
    return (
        <ListingContext.Provider value={value}>
            <section className="map-dashboard-section">
                <Dashboard />
                <MapBox />
            </section>

            <Listings />
        </ListingContext.Provider>
    );
}

export default Home;