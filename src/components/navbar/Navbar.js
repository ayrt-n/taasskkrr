import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import logoSVG from '../../assets/icons/logo.svg';
import '../../styles/Nav.css'

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, [])

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
  }

  return (
    <nav className="Nav">
      <Link to="/">
        <img src={logoSVG} className="Nav-logo" alt="" />
      </Link>
      { currentUser ? 
        <a href="/login" onClick={logOut}>Logout</a> :
        <Link to="/login">Login</Link>
      }
    </nav>
  );
}

export default Navbar;
