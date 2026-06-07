import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // Move the state and toggle function inside the Navbar component
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">AutoDoc.ai</div>

      {/* Hamburger Icon */}
      <button
        type="button"
        className={`hamburger ${isOpen ? "toggle" : ""}`}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
      >
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </button>

      {/* Links Menu */}
      <ul id="primary-navigation" className={`nav-links ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator" onClick={toggleMenu}>
            Generator
          </NavLink>
        </li>
        <li>
          <NavLink to="/contributors" onClick={toggleMenu}>
            Contributors
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
