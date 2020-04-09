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
      <Link path="/users" className="nav-link" canShow={canShow(data.currentUser)}>
        Users
      </Link>

      {/* Regular User   TODO: Profile needs to be linked -> use devise view as the user management page or createa  react view???? */}
      <Link className="nav-link">Profile</Link>

      <Link path="/" className="nav-link">
        Listings
      </Link>

      <Link path="/contact-us" className="nav-link">
        Contact Us
      </Link>
    </>
  );
};

NavbarActions.propTypes = {};

export default NavbarActions;
