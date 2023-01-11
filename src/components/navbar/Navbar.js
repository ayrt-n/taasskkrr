import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logoSVG from '../../assets/icons/logo.svg';
import AuthContext from '../../contexts/authentication/AuthContext';
import '../../styles/Nav.css'

// Navbar component
// Links and display dependent on whether use logged in or out
function Navbar({ toggleSidebar }) {
  const { currentUser, logOut } = useContext(AuthContext)

  return (
    <nav className="Nav">
      { currentUser ?
        <>
          <div className="Nav-start" aria-label="menu">
            <button className="Nav-burger" onClick={toggleSidebar}>
              <span></span><span></span><span></span>
            </button>
          </div>
          <div className="Nav-end">
            <Link to="/login" onClick={logOut}>Logout</Link>
          </div>
        </> :
        <>
          <div className="Nav-start">
            <Link to="/">
              <img src={logoSVG} className="Nav-logo" alt="" />
            </Link>
          </div>
          <div className="Nav-links Nav-end">
            <Link to="/register" className="Nav-link">Sign up</Link>
            <Link to="/login" className="Nav-link">Login</Link>
          </div>
        </>
      }
    </nav>
  );
}

export default Navbar;
