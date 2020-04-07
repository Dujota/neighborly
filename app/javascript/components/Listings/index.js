import React from 'react';

// GraphQl
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// Components

import ListingCard from './listing_card';

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
              <ListingCard title={title} id={id} user={user} createdAt={createdAt} description={description} />
            ))}
      </div>
    )}
  </Query>
);
