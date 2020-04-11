import React from 'react';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Utils
import { canShow } from '../../utils/permissions';

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

const CURRENT_USER = gql`
  {
    currentUser {
      isAdmin
    }
  }
`;

const Listings = () => {
  const { loading: listingsLoading, error: listingsError, data: listingsData } = useQuery(ALL_LISTINGS);
  const { loading: currentUserLoading, error: currentUserError, data: currentUserData } = useQuery(CURRENT_USER);

  if (listingsLoading || currentUserLoading) return 'Loading...';
  if (listingsError || currentUserError) return `Error! ${currentUserError.message || listingsError.message}`;

  return (
    <aside id="listings-component" className="card">
      {listingsData.listings.map(({ title, id, user, createdAt, description }) => (
        <ListingCard
          title={title}
          key={id}
          id={id}
          user={user}
          canShow={canShow(currentUserData.currentUser, user.id)}
          createdAt={createdAt}
          description={description}
        />
      ))}
    </aside>
  );
};

export default Listings;
