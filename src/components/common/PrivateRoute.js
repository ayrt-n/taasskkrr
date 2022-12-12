import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/authentication/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? 
    children :
    <Navigate
      to="/login"
      state={{
          type: 'danger',
          message: 'Not Authorized!',
          body: 'You are not authorized to view this page. Log in and try again!'
        }
      }
    />
}

export default PrivateRoute;
