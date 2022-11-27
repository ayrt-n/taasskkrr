import React from 'react';
import { Link } from 'react-router-dom';
import logoSVG from '../../assets/icons/logo.svg';
import '../../styles/Nav.css'

function Navbar({ currentUser, logOut }) {
  return (
    <nav className="Nav">
      <Link to="/">
        <img src={logoSVG} className="Nav-logo" alt="" />
      </Link>
      { currentUser ? 
        <a href="/login" onClick={logOut}>Logout</a> :
        <div className="Nav-links">
          <Link to="/register" className="Nav-link">Sign up</Link>
          <Link to="/login" className="Nav-link">Login</Link>
        </div>
      }
    </nav>
  );
}

export default Navbar;
