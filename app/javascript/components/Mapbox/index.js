/* eslint-disable react/display-name */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// Component
import Listing from "../Listing"

const GET_LISTING_ID = gql`
    {
        listingId @client
    } 
`
;

export default () => {
    const { data } = useQuery(GET_LISTING_ID);

    return (

        <article id="mapbox-component">
            <Listing listingId={data ? data.listingId : 1} />
        </article>
    );
}