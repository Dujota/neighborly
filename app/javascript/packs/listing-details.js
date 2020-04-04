import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import ListingDetails from '../components/ListingDetails';

const listingId = document.querySelector('#root').getAttribute("listing-id-data");
console.log(listingId);
render(
  <Provider>
    <ListingDetails listingId={listingId} />
  </Provider>,
  document.querySelector('#root')
);
