import React from 'react';
// import PropTypes from 'prop-types';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import ListingDetails from './listing_details';

// eslint-disable-next-line react/display-name
export default ({ listingId }) => {
  const GET_LISTING = gql`
  query{
    listing(id: ${listingId}) {
      id
      title
      description
      imageUrl
      createdAt
      user {
        id
        email
      }
    }
  }
`;

  const { loading, error, data } = useQuery(GET_LISTING);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return <ListingDetails listing={data.listing} />;
};
