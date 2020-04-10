import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from "react-apollo"; 

// Utilities
import Moment from 'react-moment';

// Components
import Link from '../link';


const ListingCard = ({ id, createdAt, title, user, description, canShow }) => {
  const client = useApolloClient();

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
        {/* <Link path={`/listing?id=${id}`} className="btn listing-btn btn-secondary">
          More Details
        </Link> */}
         <Link onClick={(e)=>{
                  e.preventDefault();
                  client.writeData({ data: { selectedListingId : id } })}
               } 
                className="btn listing-btn btn-secondary">
          More Details
        </Link>

        <Link path={`/listing?id=${id}&edit=true`} className="btn listing-btn btn-secondary" canShow={canShow}>
          Edit
        </Link>
      </div>
    </div>
  );
}

ListingCard.propTypes = {
  id: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.object,
  description: PropTypes.string,
};

export default ListingCard;
