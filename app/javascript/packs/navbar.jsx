import React from 'react';
import { render } from 'react-dom';

import Provider from '../components/Provider';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#nav-bar');

  if (element) {
    render(
      <Provider>
        <>NAVBAR COMPONENT</>
      </Provider>,
      element
    );
  }
});
