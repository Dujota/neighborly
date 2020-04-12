import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo';

// Utilities
import Moment from 'react-moment';

// Components
import Link from '../link';

const ListingCard = ({ id, createdAt, title, user, description, canShow }) => {
  const client = useApolloClient();

  return (
    <div className="listing-item card" key={id}>
      {/* <h3>{title}</h3>
      <p>{user && user.email}</p>
      <p></p>
      <Moment format="DD/MM/YYYY">{createdAt}</Moment> */}

      <div className="listing-card-content-container" role="menuitem" tabIndex="0">
        <div className="listing-card-header">
          <h2 className="listing-card-title">Our Changing Planet</h2>
          <h3 className="listing-card-user">{user && user.email}</h3>
        </div>

        <div className="listing-card-body">{description}</div>
      </div>
      <div className="listing-card-actions">
        <div className="listing-card-action-buttons">
          <Link
            onClick={e => {
              e.preventDefault();
              client.writeData({ data: { selectedListingId: id, edit: false } });
            }}
            className="btn listing-btn btn-secondary"
          >
            More Details
          </Link>

          <Link
            onClick={e => {
              e.preventDefault();
              client.writeData({ data: { selectedListingId: id, edit: true } });
            }}
            className="btn listing-btn btn-secondary"
            canShow={canShow}
          >
            Edit
          </Link>
        </div>
        {/* <div className="mdc-card__action-icons">ICON LINKS GO HERE </div> */}
      </div>
    </div>
  );
};
ListingCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
  description: PropTypes.string,
};

export default ListingCard;
