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
    <div className="listing-item" key={id}>
      <h3>{title}</h3>
      <p>{user && user.email}</p>
      <p>{description}</p>
      <Moment format="DD/MM/YYYY">{createdAt}</Moment>

      <div className="listing-action-section">
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
