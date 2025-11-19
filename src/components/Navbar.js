import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Kevin Tuan Tran
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-links ${location.pathname === '/' ? 'active' : ''}`}
            >
              About Me
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/projects" 
              className={`nav-links ${location.pathname === '/projects' ? 'active' : ''}`}
            >
              Projects & Demos
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/resume" 
              className={`nav-links ${location.pathname === '/resume' ? 'active' : ''}`}
            >
              Resume
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/blog" 
              className={`nav-links ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
            >
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
