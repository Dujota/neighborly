import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import Listing from '../components/Listing';

const listingId = document.querySelector('#root').getAttribute("listing-id-data");

render(
  <Provider>
    <Listing listingId={listingId} />
  </Provider>,
  document.querySelector('#root')
);
