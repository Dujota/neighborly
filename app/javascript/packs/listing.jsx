import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import Listing from '../components/Listing';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#listing-mounting-point');

  if (element) {
    const listingId = element.getAttribute('listing-id-data');

    render(
      <Provider>
        <Listing listingId={listingId} />
      </Provider>,
      element
    );
  }
});
