/* eslint-disable react/display-name */
import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

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

export default () => {
  const { data, loading, error } = useQuery(GET_LISTING_INFO);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data.createListing) {
    return <ProcessListingForm createListing={data.createListing} />;
  }

  if (data.editListing) {
    return <Listing listingId={data.selectedListingId} editListing={data.editListing} />;
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
