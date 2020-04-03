import React from 'react';

// Utilities
import Moment from 'react-moment';

// GraphQl
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import Link from '../link';
//import Listings from '../Listings';

const query = gql`
  {
    listing(id: 1) {
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
  <Query query={query}>
    {({ data, loading, error }) => (
      
      <div id="listInfo">{console.log(error)}
        {loading
          ? 'loading...'
          : data.listing.map(({ title, id, user, createdAt, description }) => (
              <div key={id}>
                <h1>{title}</h1>
                <h2>{user.name}</h2>
                <h3>{description}</h3>
              </div>
            ))}
      </div>
    )}
  </Query>
);