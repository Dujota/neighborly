import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import ListingDetails from './listing_details';
import EditListingForm from './edit_listing_form';

// TODO : LOOK AT REDIRECT CACHE https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects

// eslint-disable-next-line react/display-name
export default ({ listingId, edit = false }) => {
  const GET_LISTING = gql`
  query{
    listing(id: ${listingId}) {
      id
      title
      description
      imageUrl
        user{
          id
          email
        }
    }
  }
`;
  const [editing, setEditing] = useState(edit);

  const toggleEditMode = e => {
    if (e) {
      // if used with a Link component
      e.preventDefault();
    }
    // Formik already handles the preventDefault for us
    setEditing(!editing);
  };

  const { loading, error, data } = useQuery(GET_LISTING);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (editing) {
    return <EditListingForm handleToggleEditMode={toggleEditMode} {...data.listing} />;
  }
  return <ListingDetails listing={data.listing} handleToggleEditMode={toggleEditMode}></ListingDetails>;
};
