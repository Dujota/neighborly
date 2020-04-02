import React from 'react';
import Moment from 'react-moment';
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
      {({ data, loading }) => (
        <div id="listings">
          {loading
            ? 'loading...'
            : data.listings.map(({ title, id, user, createdAt }) => (
                <div className="listing-item" key={id}>
                  <div className="listing-image-section">
                    <img src="https://cdn2.iconfinder.com/data/icons/grocery-store-solid/64/Grocery_food-36-512.png" />
                  </div>
                  <div className="listing-info-section">
                    <h3 className="listing-title">{title}</h3>
                    <span className="listing-user">added by <span>{user ? user.email : null}</span></span>
                    <p className="listing-details">details...</p>
                  </div>
                  <div className="listing-action-section">
                    <span className="listing-date">
                      <Moment format="DD/MM/YYYY">{createdAt}</Moment>
                    </span>
                    <a href={`/listingInfo/${id}`}><button className="listing-btn">More Details</button></a>
                  </div>
                </div>
              ))}
        </div>
      )}

  </Query>
);
