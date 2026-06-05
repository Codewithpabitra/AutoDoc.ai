import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        AutoDoc.ai
      </div>
      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/generator">Generator</NavLink></li>
        <li><NavLink to="/contributors">Contributors</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navbar;
