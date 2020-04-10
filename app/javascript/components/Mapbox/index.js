/* eslint-disable react/display-name */
import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Component
import Listing from '../Listing';

const GET_LISTING_ID = gql`
  {
    selectedListingId @client,
    edit @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_LISTING_ID);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <article id="mapbox-component">{data.edit ? data.selectedListingId && <Listing listingId={data.selectedListingId} edit={data.edit} /> : data.selectedListingId && <Listing listingId={data.selectedListingId} />}</article>
  );
};
