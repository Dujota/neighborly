import React from 'react';
import { render } from 'react-dom';

import Link from '../components/link';

export default function AddListing() {
  const handleCreateListing = e => {
    e.preventDefault();

    window.EventSystem.publish('create.new.listing', { createNewListing: true });
  };

  return (
    <Link className="btn btn-secondary" onClick={handleCreateListing}>
      Add Listing
    </Link>
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('#create-btn');

  if (element) {
    render(<AddListing />, element);
  }
});
