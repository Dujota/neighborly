import React from 'react';

// Utilities
import Moment from 'react-moment';

// GraphQl
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import Link from '../link';

// eslint-disable-next-line react/display-name
export default props => {
  const ListingQuery = gql`
  query{
    listing(id: ${props.listingId}) {
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

  return (
    <Query query={ListingQuery}>
      {({ data, loading }) => (
        <div id="listInfo">
          {loading ? (
            'loading...'
          ) : (
            <div id="listing-details">
              <div className="listing-details-header">
                <div className="heading">
                  <img className="logo" src="https://thumbs.dreamstime.com/z/neighbor-icon-vicinal-170543124.jpg"></img>
                  <h4>Neighborly</h4>
                </div>
                <img className="listing-image" src={data.listing.imageUrl}></img>
                <h1 className="listing-title">{data.listing.title}</h1>
                <div className="listing-description-box">
                  <h2 className="section-title">Details</h2>
                  <h3 className="listing-description">{data.listing.description}</h3>
                </div>
              </div>
              <div className="listing-details-body">
                <div className="user-info-box">
                  <h2>User Info</h2>
                  <span>Name: COMING SOON</span>
                  <span>Email: {data.listing.user.email}</span>
                  <span>Created At: {data.listing.createdAt}</span>
                </div>
                <div className="map-box"></div>
              </div>
            </div>
          )}
        </div>
      )}
    </Query>
  );
};
