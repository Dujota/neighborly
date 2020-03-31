import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import Listing from '../components/Listings';

render(
  <Provider>
    <Listing />
  </Provider>,
  document.querySelector('#root')
);
