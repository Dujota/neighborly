import React from 'react';


// Components
import Listings from '../Listings';
import Dashboard from '../Dashboard';
import MapBox from '../Mapbox';


const Home = () => {
    
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

export default Home;