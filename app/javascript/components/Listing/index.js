import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// GraphQl
import { useQuery, useApolloClient } from 'react-apollo';
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
export default ({ listingId = '', edit = false, createNewListing = false }) => {
  const client = useApolloClient();

  const [editing, setEditing] = useState(edit);
  const [listing, setListing] = useState(listingId);
  const [creating, setCreating] = useState(createNewListing);

  // if the edit prop changes, updates the components edit state to toggle views properly
  useEffect(() => {
    if (editing !== edit) setEditing(edit);
    if (listing !== listingId) setListing(listingId);
    if (creating !== createNewListing) setCreating(createNewListing);
  }, [edit, editing, listing, listingId, createNewListing, creating]);

  const toggleEditMode = e => {
    if (e) {
      // if used with a Link component
      e.preventDefault();
      return client.writeData({ data: { selectedListingId: listingId, edit: !editing, createNewListing: !createNewListing } });
    }

    // Formik already handles the preventDefault for us
    client.writeData({ data: { selectedListingId: listingId, edit: false } });
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

  if(createNewListing){
    return (
      <div className="card">
        <EditListingForm handleToggleEditMode={toggleEditMode} editing={editing} id={listingData.listing.id}/>
      </div>
    )
  }

  if (editing) {
    return (
      <div className="card">
        <EditListingForm handleToggleEditMode={toggleEditMode} editing={editing} {...listingData.listing} />
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
