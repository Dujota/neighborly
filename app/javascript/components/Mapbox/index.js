/* eslint-disable react/display-name */
import React from 'react';
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Component
import Listing from '../Listing';

const GET_LISTING_INFO = gql`
  {
    selectedListingId @client
    edit @client
  }
`;

export default () => {
  const { data, loading, error } = useQuery(GET_LISTING_INFO);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (data.selectedListingId) {
    return <Listing listingId={data.selectedListingId} edit={data.edit} />;
  }
  return (
    <article id="mapbox-component" className="card">
      MAPBOX
      <div className="container">
        <form>
          <h1>Material Design formular</h1>

          {/* <div className="form-group">
            <select>
              <option>Value 1</option>
              <option>Value 2</option>
            </select>
            <label htmlFor="select" className="control-label">
              Selectbox
            </label>
            <i className="bar"></i>
          </div> */}

          <div className="form-group">
            <input type="text" required="required" />
            <label htmlFor="input" className="control-label">
              Textfield
            </label>
            <i className="bar"></i>
          </div>

          <div className="form-group">
            <textarea required="required"></textarea>
            <label htmlFor="textarea" className="control-label">
              Textarea
            </label>
            <i className="bar"></i>
          </div>
        </form>

        <div className="button-container">
          <button type="button" className="button">
            <span>Submit</span>
          </button>
        </div>
      </div>
    </article>
  );
};
