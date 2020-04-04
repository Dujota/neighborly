import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider';

// Components
import Listings from '../components/Listings';

render(
  <Provider>
    <Listings />
  </Provider>,
  document.querySelector('#root')
);
