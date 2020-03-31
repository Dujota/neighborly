import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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
      <div>
        {loading
          ? 'loading...'
          : data.listings.map(({ title, id, user }) => (
              <div key={id}>
                <b>{title}</b> {user ? `added by ${user.email}` : null}
              </div>
            ))}
      </div>
    )}
  </Query>
);
