import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import ListingDetails from '../components/ListingDetails';

render(
  <Provider>
    <ListingDetails />
  </Provider>,
  document.querySelector('#root')
);
