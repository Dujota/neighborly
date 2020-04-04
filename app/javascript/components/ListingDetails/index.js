import React from 'react';

// Utilities
import Moment from 'react-moment';

// GraphQl
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import Link from '../link';
//import Listings from '../Listings';

// eslint-disable-next-line react/display-name
export default (props) => {

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

  return(
  <Query query={ListingQuery}>
    {({ data, loading }) => (
      <div id="listInfo">
        {loading
          ? 'loading...'
          : <div key={data.listing.id}>
              <img src={data.listing.imageUrl}></img>
              <h1>{data.listing.title}</h1>
              <h4>by {data.listing.user.email}</h4>
              <h3>{data.listing.description}</h3>
            </div>
        }
      </div>
    )}
  </Query>
  );
};