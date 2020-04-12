import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Utils
import { canShow } from '../../utils/permissions';

// Components
import ListingDetails from './listing_details';
import EditListingForm from './edit_listing_form';

// TODO : LOOK AT REDIRECT CACHE https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects

const GET_LISTING = gql`
  query listing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      imageUrl
      user {
        id
        email
      }
    }
  }
`;

const CURRENT_USER = gql`
  {
    currentUser {
      isAdmin
    }
  }
`;

// eslint-disable-next-line react/display-name
export default ({ listingId = "", edit = false }) => {
  const [editing, setEditing] = useState(edit);
  const [listing, setListing] = useState(listingId);

  // if the edit prop changes, updates the components edit state to toggle views properly
  useEffect(() => {
    if(editing !== edit) setEditing(edit);
    if(listing !== listingId) setListing(listingId);
  }, [edit, listingId]);

  const toggleEditMode = e => {
    if (e) {
      // if used with a Link component
      e.preventDefault();
    }
    // Formik already handles the preventDefault for us
    setEditing(!editing);
  };

  // Execute Queries
  const { loading: listingLoading, error: listingError, data: listingData } = useQuery(GET_LISTING, {
    variables: {
      id: listing,
    },
  });

  const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(CURRENT_USER);

  if (listingLoading || currentUserLoading) return 'Loading...';
  if (listingError || currentUserError) return `Error! ${listingError.message || currentUserError.message}`;

  if (editing) {
    return (
      <div className="card">
        <EditListingForm handleToggleEditMode={toggleEditMode} {...listingData.listing} />
      </div>
    );
  }

  return (
    <div className="card">
      <ListingDetails
        listing={listingData.listing}
        handleToggleEditMode={toggleEditMode}
        canShow={canShow(currentUserData.currentUser, listingData.listing.user.id)}
      />
    </div>
  );
};
