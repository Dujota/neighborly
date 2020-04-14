import React from 'react';
import { render } from 'react-dom';

import Provider from '../components/Provider';
import CreateListing from '../components/Listing/create_listing'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#create-btn');
  

  if (element) {
    render(
      <Provider>
        <CreateListing />
      </Provider>,
      element
    );
  }
});
