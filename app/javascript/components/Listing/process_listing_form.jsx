/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useQuery, useMutation } from 'react-apollo';

import * as Yup from 'yup';
import { Formik } from 'formik';

import Error from '../Forms/error';

const CURRENT_USER = gql`
  {
    currentUser {
      isAdmin
      id
      userLocation
    }
  }
`;

const UPDATE_LISTING = gql`
  mutation UpdateListing($id: ID!, $title: String!, $description: String!, $imageUrl: String, $location: String!) {
    updateListing(id: $id, title: $title, description: $description, imageUrl: $imageUrl, location: $location) {
      listing {
        id
        title
        description
        imageUrl
        location
      }
    }
  }
`;

const CREATE_LISTING = gql`
  mutation CreateListing($title: String!, $description: String!, $imageUrl: String, $location: String!) {
    createListing(title: $title, description: $description, imageUrl: $imageUrl, location: $location) {
      listing {
        id
        title
        description
        imageUrl
        createdAt
        location
        user {
          id
          email
        }
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
      location
      user {
        id
        email
      }
    }
  }
`;

const ListingValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(75, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(1000, 'Too Long!'),
  image_url: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!'),
});

export default function ProcessListingForm({ id, title, description, imageUrl, location, handleToggleEditMode, addListing }) {
  const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(CURRENT_USER);

  const coordsToAddress = (coords) => {
    //Input lat lng into geosuggest 
    //Get address from geo suggest
    //Return address
  };

  const [updateListing] = useMutation(UPDATE_LISTING);
  const [createListing] = useMutation(CREATE_LISTING, {
    update(cache, { data: { createListing: newListing } }) {
      const currentListings = cache.readQuery({ query: ALL_LISTINGS });

      cache.writeData({
        data: {
          editListing: false,
          createListing: false,
          selectedListingId: newListing.listing.id,
          listings: [newListing.listing, ...currentListings.listings],
        },
      });
    },
  });

  const onSubmit = (values, { setSubmitting }) => {
    if (handleToggleEditMode) {
      updateListing({
        variables: { id, title: values.title, description: values.description, imageUrl: values.imageUrl, location: values.location },
        optimisticResponse: {
          __typename: 'Mutation',
          updateListing: {
            __typename: 'UpdateListingMutationPayload',
            item: {
              id,
              __typename: 'Listing',
              title,
              description,
              imageUrl,
            },
          },
        },
      });

      handleToggleEditMode();
    }

    if (addListing) {
      createListing({
        variables: { title: values.title, description: values.description, imageUrl: values.imageUrl, location: values.location },
      });
    }
  };

  return (
    <Formik
      initialValues={{ title, description, imageUrl, location }}
      validationSchema={ListingValidationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {// Render Prop
      ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>{handleToggleEditMode ? 'Update' : 'Add a new'} Listing</h2>

            <div className="form-group">
              <input
                id="title"
                type="text"
                name="title"
                required="required"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={touched.title && errors.title ? 'has-error' : null}
              />
              <label htmlFor="title" className="control-label">
                Title
              </label>
              <i className="bar"></i>
              {errors && <Error touched={touched.title} message={errors.title} />}
            </div>

            <div className="form-group">
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.imageUrl}
                className={touched.imageUrl && errors.imageUrl ? 'has-error' : null}
              />
              <label htmlFor="imageUrl" className="control-label">
                Listing Image URL ( Optional )
              </label>
              <i className="bar"></i>
              {errors && <Error touched={touched.imageUrl} message={errors.imageUrl} />}
            </div>

            <div className="form-group">
              <textarea
                id="description"
                name="description"
                required="required"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className={touched.description && errors.description ? 'has-error' : null}
              ></textarea>

              <label htmlFor="description" className="control-label">
                Description
              </label>

              <i className="bar"></i>
              {errors && <Error touched={touched.title} message={errors.title} />}
            </div>

            <div className="form-group">
              <input
                id="location"
                type="text"
                name="location"
                required="required"
                onChange={handleChange}
                onBlur={handleBlur}
                value={
                  //Use coordsToAddress to get a more readable location for the user
                  currentUserData && currentUserData.currentUser.userLocation
                }
                className={touched.location && errors.location ? 'has-error' : null}
              />
              <label htmlFor="location" className="control-label">
                Location
              </label>
              <i className="bar"></i>
              {errors && <Error touched={touched.location} message={errors.location} />}
            </div>

            <div className="button-container">
              <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );
}

ProcessListingForm.defaultProps = { title: '', description: '', imageUrl: '', location: '' };

ProcessListingForm.propTypes = {
  id: PropTypes.string,
  handleToggleEditMode: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  location: PropTypes.string,
  addListing: PropTypes.bool,
};
