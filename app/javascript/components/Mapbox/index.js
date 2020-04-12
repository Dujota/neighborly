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
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_LISTING_INFO);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data.selectedListingId) {
    return <Listing listingId={data.selectedListingId} edit={data.edit} />;
  }
  return (
    <article id="mapbox-component" className="card">
      MAPBOX
    </article>
  );
};
