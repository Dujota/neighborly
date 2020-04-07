import React from 'react';
import PropTypes from 'prop-types';

// GraphQl
import gql from 'graphql-tag';

// Utilities
import Moment from 'react-moment';

// Components
import { Query } from 'react-apollo';
import Link from '../link';

const CURRENT_USER = gql`
  {
    currentUser {
      id
    }
  }
`;

const ListingCard = ({ id, createdAt, title, user, description }) => (
  <Query query={CURRENT_USER}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
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

            {user && (
              <span className="listing-user">
                added by <span>{user.email}</span>
              </span>
            )}

            <p className="listing-details">{description}</p>
          </div>
          <div className="listing-action-section">
            <Link path={`/listing?id=${id}`} className="btn listing-btn btn-secondary">
              More Details
            </Link>

            {(data.currentUser.id === user.id || user.isAdmin) && (
              <Link path={`/listing?id=${id}&edit=true`} className="btn listing-btn btn-secondary">
                Edit
              </Link>
            )}
          </div>
        </div>
      );
    }}
  </Query>
);

ListingCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
  description: PropTypes.string,
};

export default ListingCard;
