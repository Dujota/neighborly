import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ListingsQuery = gql`
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

// eslint-disable-next-line react/display-name
export default () => (
  <Query query={ListingsQuery}>
    <div id="listings">
      {({ data, loading }) => (
        <div>
          {loading
            ? 'loading...'
            : data.listings.map(({ title, id, user }) => (
                <div className="listing-item" key={id}>
                  <div className="listing-image-section">
                    <img />
                  </div>
                  <div className="listing-info-section">
                    <h3 className="listing-title">{title}</h3>
                    <span className="listing-user">{user ? `added by ${user.email}` : null}</span>
                    <p className="listing-details">details...</p>
                  </div>
                  <div className="listing-action-section">
                    <span className="listing-date"></span>
                    <button className="listing-btn">More Details</button>
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  </Query>
);
