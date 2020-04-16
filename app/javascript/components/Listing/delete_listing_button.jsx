import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo';

import Link from '../link';

const DELETE_LISTING = gql`
  mutation DelteListing($id: ID!) {
    deleteListing(id: $id) {
      listing {
        id
      }
    }
  }
`;

const ALL_LISTINGS = gql`
  {
    listings {
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

export default function DeleteListingButton() {
  const [deleteListing] = useMutation(DELETE_LISTING, {
    update(cache, { data: { deleteListing } }) {
      const currentListings = cache.readQuery({ query: ALL_LISTINGS });
    },
  });
  return (
    <Link
      className="btn btn-danger"
      onClick={e => {
        e.preventDefault();
      }}
    >
      Delete Listing
    </Link>
  );
}
