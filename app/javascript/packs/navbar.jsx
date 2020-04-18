import React from 'react';
import { render } from 'react-dom';

import Provider from '../components/Provider';
import NavBarActions from '../components/Menus/navbar_actions';
import Logo from '../components/Menus/logo';

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#nav-bar');

  if (element) {
    render(
      <Provider>
        <div id="nav-fixed-wrapper">
          <Logo />
          <NavBarActions />
        </div>
      </Provider>,
      element
    );
  }
});
