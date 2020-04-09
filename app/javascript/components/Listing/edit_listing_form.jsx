import React from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { useMutation } from 'react-apollo';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

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

export default function EditListingForm({ id, title, description, imageUrl, handleToggleEditMode }) {
  let input;

  const [updateListing, { data }] = useMutation(UPDATE_LISTING);

  const handleSubmit = values => {
    updateListing({
      variables: { id, title: values.title, description: values.description, imageUrl: values.imageUrl },
    });
  };

  return (
    <Formik
      initialValues={{ title, description, imageUrl }}
      validationSchema={ListingValidationSchema}
      onSubmit={handleSubmit}
    >
      {// Render Prop
      ({ errors, touched }) => (
        <Form>
          <h2>EDIT LISTING FORM</h2>
          <Field name="title" />
          <Error touched={touched.title} message={errors.title} />
          <Field name="description" as="textarea" />
          <Error touched={touched.description} message={errors.description} />
          <Field name="imageUrl" />
          <Error touched={touched.imageUrl} message={errors.imageUrl} />
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={handleToggleEditMode}>
            Exit Edit
          </button>
        </Form>
      )}
    </Formik>
  );
}

EditListingForm.defaultProps = { title: '', description: '', imageUrl: '' };

EditListingForm.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};
