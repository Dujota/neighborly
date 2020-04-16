import React from 'react';
import { render } from 'react-dom';

import AddListingButton from '../components/Listing/add_listing_button';

if (window.location.pathname !== '/users/edit') {
  document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('#add-listing-btn');

    if (element) {
      render(<AddListingButton />, element);
    }
  });
}
