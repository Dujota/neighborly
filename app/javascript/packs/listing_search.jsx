import React from 'react';
import { render } from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  // const element = document.querySelector('#top-bar');
  let element;

  if (element) {
    render(<div className="top-bar">TOPBAR SEARCH COMPONENT</div>, element);
  }
});
