import React from 'react';
import { render } from 'react-dom';
import Provider from '../components/Provider/index';

// Components
import Home from "../components/Home"

render(
  <Provider>
    <Home />
  </Provider>,
  document.querySelector('#home')
);
