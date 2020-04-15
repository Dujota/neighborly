import React from 'react';
import Link from '../link';

export default function CreateListing() {
  const handleCreateListing = e => {
    e.preventDefault();
  };

  return (
    <Link className="btn btn-secondary" onClick={handleCreateListing}>
      Creat Listing
    </Link>
  );
}
