import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NotFound.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function NotFound() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    document.title = "404 - Page Not Found | AutoDoc.ai";
  }, []);

  return (
    <div className="notfound-container">
      <Navbar user={user} onLogout={handleLogout} />

      <div className="bg-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <main className="content-wrapper">
        <div className="error-code" aria-label="404 error">404</div>
        <h1 className="error-title">Page Not Found</h1>
        <p className="error-desc">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="suggestions">
          <p className="suggestions-label">Try these pages instead:</p>
          <div className="suggestion-links">
            <Link to="/" className="suggestion-card">
              <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Home</span>
            </Link>
            <Link to="/generator" className="suggestion-card">
              <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>Generator</span>
            </Link>
            <Link to="/contributors" className="suggestion-card">
              <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span>Contributors</span>
            </Link>
          </div>
        </div>

        <Link to="/" className="btn btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Back to Homepage
        </Link>
      </main>

      <Footer />
    </div>
  );
}

export default NotFound;
