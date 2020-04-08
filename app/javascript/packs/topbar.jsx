import React from 'react';
import { render } from 'react-dom';

import Provider from '../components/Provider';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#top-bar');

  if (element) {
    render(
      <Provider>
        <div className="top-bar">TOPBAR COMPONENT</div>
      </Provider>,
      element
    );
  }
});
