import React from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Error from '../Forms/error';

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

export default function EditListingForm({ title, description, imageUrl }) {
  const handleSubmit = values => {
    // same shape as initial values
    console.log(values);
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
        </Form>
      )}
    </Formik>
  );
}

EditListingForm.defaultProps = { title: '', description: '', imageUrl: '' };

EditListingForm.propTypes = { title: PropTypes.string, description: PropTypes.string, imageUrl: PropTypes.string };
