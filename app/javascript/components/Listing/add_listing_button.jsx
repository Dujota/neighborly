import React from 'react';
import Link from '../link';

export default function CreateListing() {
  const handleCreateListing = e => {
    e.preventDefault();

    window.EventSystem.publish('create.new.listing', { createNewListing: true });
  };

  return (
    <Link className="btn btn-secondary" onClick={handleCreateListing}>
      Creat Listing
    </Link>
  );
}
