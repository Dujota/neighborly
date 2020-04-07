import React from 'react';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import ListingCard from './listing_card';

const ALL_LISTINGS = gql`
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

const Listings = () => {
  const { loading, error, data } = useQuery(ALL_LISTINGS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div id="listings">
      {data.listings.map(({ title, id, user, createdAt, description }) => (
        <ListingCard title={title} key={id} id={id} user={user} createdAt={createdAt} description={description} />
      ))}
    </div>
  );
};

export default Listings;
