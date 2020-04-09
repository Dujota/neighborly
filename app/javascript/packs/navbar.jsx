import React from 'react';
import { render } from 'react-dom';

import Provider from '../components/Provider';
import Link from '../components/link';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#nav-bar');

  if (element) {
    render(
      <Provider>
        <>
          <Link>Profile</Link>
          <Link>Listings</Link>
          <Link>Contact Us</Link>
          <Link>Users</Link>
        </>
      </Provider>,
      element
    );
  }
});
