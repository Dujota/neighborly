import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

import Link from '../link';

const DELETE_LISTING = gql`
  mutation DelteListing($id: ID!) {
    deleteListing(id: $id) {
      listing {
        id
        title
        description
        imageUrl
        createdAt
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

export default function DeleteListingButton({ listingId }) {
  const [deleteListing] = useMutation(DELETE_LISTING, {
    update(cache, { data: { deleteListing } }) {
      const currentListings = cache.readQuery({ query: ALL_LISTINGS });

      cache.writeData({
        data: {
          editListing: false,
          createListing: false,
          selectedListingId: '',
          listings: currentListings.listings.filter(listing => listing.id !== listingId),
        },
      });
    },
  });
  return (
    <Link
      className="btn btn-danger"
      onClick={e => {
        e.preventDefault();
        if (window.confirm(`Are you sure you want to delete listing No. ${listingId}`)) {
          deleteListing({
            variables: { id: listingId },
          });
        }
      }}
    >
      Delete Listing
    </Link>
  );
}

DeleteListingButton.propTypes = {
  listingId: PropTypes.string,
};
