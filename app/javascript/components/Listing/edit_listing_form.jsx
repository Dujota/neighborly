/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

import * as Yup from 'yup';
import { Formik } from 'formik';

import Error from '../Forms/error';

const UPDATE_LISTING = gql`
  mutation UpdateListing($id: ID!, $title: String!, $description: String!, $imageUrl: String) {
    updateListing(id: $id, title: $title, description: $description, imageUrl: $imageUrl) {
      listing {
        id
        title
        description
        imageUrl
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

export default function EditListingForm({ id, title = "", description = "", imageUrl = "", editing, handleToggleEditMode }) {
  
  const [updateListing, { data }] = useMutation(UPDATE_LISTING);

  const onSubmit = (values, { setSubmitting }) => {
    updateListing({
      variables: { id, title: values.title, description: values.description, imageUrl: values.imageUrl },
    });

    if (handleToggleEditMode) {
      handleToggleEditMode();
    }
  };

  return (
    <Formik
      initialValues={{ title, description, imageUrl }}
      validationSchema={ListingValidationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {// Render Prop
      ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
      <h2>{editing ? 'EDIT' : 'NEW'} LISTING FORM</h2>

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
                required="required"
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

EditListingForm.defaultProps = { title: '', description: '', imageUrl: '' };

EditListingForm.propTypes = {
  id: PropTypes.string.isRequired,
  handleToggleEditMode: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};
