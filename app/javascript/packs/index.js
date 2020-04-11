import React from 'react';
import { render } from 'react-dom';

// Components
import Home from '../components/Home';
import Provider from '../components/Provider';

render(
  <Provider>
    <Home />
  </Provider>,
  document.querySelector('#home')
);
