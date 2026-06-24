
import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="nav-logo">AutoDoc.ai</div>
      </div>

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
        {user ? (
          <li className="logout-mobile">
            <button onClick={handleLogout} className="logout-btn-mobile">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li className="login-mobile">
              <Link to="/login" onClick={toggleMenu}>Login</Link>
            </li>
            <li className="signup-mobile">
              <Link to="/signup" onClick={toggleMenu}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>

      <div className="nav-actions">
        {user ? (
          <div className="user-info">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="nav-login-btn">Login</Link>
            <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
          </div>
        )}
        <ThemeToggle />

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
      </div>
    </nav>
  );
};

export default Navbar;