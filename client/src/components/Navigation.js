import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/" className="nav-link">Inventory</Link>
      <Link to="/add" className="nav-link">Add Item</Link>
    </nav>
  );
};

export default Navigation;