import React from 'react';
import PropTypes from 'prop-types';

// GraphQl
import { useQuery } from 'react-apollo';
import gql from 'graphql-tag';

// Utils
import { canShow } from '../../utils/permissions';

import Link from '../link';

const CURRENT_USER = gql`
  {
    currentUser {
      isAdmin
    }
  }
`;

const NavbarActions = () => {
  const { loading, error, data } = useQuery(CURRENT_USER);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {/* ADMIN */}
      <Link title="All Users" path="/users" className="nav-link" canShow={canShow(data.currentUser)}>
        <i className="fas fa-users-cog" />
        Users
      </Link>

      {/* Regular User   TODO: Profile needs to be linked -> use devise view as the user management page or create a  react view???? */}
      <Link title="Access your Profile" className="nav-link">
        <i className="far fa-address-card" />
        Profile
      </Link>

      <Link title="Listings" path="/" className="nav-link">
        <i className="far fa-list-alt" />
        Listings
      </Link>

      <Link title="Get in touch" path="/contact-us" className="nav-link">
        <i className="far fa-comments" />
        Contact
      </Link>
    </>
  );
};

NavbarActions.propTypes = {};

export default NavbarActions;
