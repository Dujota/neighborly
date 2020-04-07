import React from 'react';

// Utilities
import Moment from 'react-moment';

// GraphQl
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import Link from '../link';

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
          : data.listings.map(({ title, id, user, createdAt, description }) => (
              <div className="listing-item" key={id}>
                <span className="listing-date">
                    <Moment format="DD/MM/YYYY">{createdAt}</Moment>
                </span>
                <div className="listing-image-section"> 
                  <img
                    src="https://cdn2.iconfinder.com/data/icons/grocery-store-solid/64/Grocery_food-36-512.png"
                    alt="listing-avatar"
                  />
                </div>
                <div className="listing-info-section">
                  <h3 className="listing-title">{title}</h3>
                  <span className="listing-user">
                    added by <span>{user ? user.email : null}</span>
                  </span>
                  <p className="listing-details">{description}</p>
                  <div></div>
                </div>
                <div className="listing-action-section">
                  

                  <Link path={`/listing?id=${id}`} className="btn listing-btn btn-secondary">
                    More Details
                  </Link>
                </div>
              </div>
            ))}
      </div>
    )}
  </Query>
);
