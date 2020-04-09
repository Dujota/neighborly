/* eslint-disable react/display-name */
import React, { useContext } from 'react';

// Component
import Listing from "../Listing"

// Context
import { ListingContext } from "../Home/listingContext"

export default () => {
    const{ listingId, setListingId } = useContext(ListingContext);

    return (
        <article id="mapbox-component">
            <Listing listingId={listingId} />
        </article>
    );
}