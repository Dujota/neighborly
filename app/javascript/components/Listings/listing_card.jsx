import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo';

// Components
import Link from '../link';

const ListingCard = ({ id, title, user, description, canShow, adjustHeight }) => {
  const client = useApolloClient();

  return (
    <div className="listing-item card" key={id} role="menuitem" tabIndex="0">
      {/* Container */}
      <div className="listing-card-content-container">
        {/* Headers container */}
        <div className="listing-card-header">
          {/* Title */}
          <h2 className="listing-card-title">{title}</h2>
          {/* Sub Header */}
          <h3 className="listing-card-user subtitle">{user && user.email}</h3>
        </div>

        {/* Description */}
        <div className="listing-card-body">{description}</div>
      </div>

      {/* Actions */}
      <div className="listing-card-actions">
        <div className="listing-card-action-buttons">
          <Link
            onClick={e => {
              e.preventDefault();
              client.writeData({ data: { selectedListingId: id, editListing: false, createNewListing: false } });
              adjustHeight(1323);
            }}
            className="btn-txt-link btn-txt-primary"
          >
            More Details
          </Link>
          <Link
            onClick={e => {
              e.preventDefault();
              client.writeData({ data: { selectedListingId: id, editListing: true } });
              adjustHeight(803);
            }}
            className="btn-txt-link btn-txt-secondary"
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
  title: PropTypes.string,
  user: PropTypes.object,
  description: PropTypes.string,
  canShow: PropTypes.bool,
};

export default ListingCard;
