import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-brand">
        Sahayatri
      </Link>
      <div className="nav-links">
        <Link to="/find-users" className="nav-link">Find Users</Link>
        <Link to="/profile" className="nav-link">My Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;
