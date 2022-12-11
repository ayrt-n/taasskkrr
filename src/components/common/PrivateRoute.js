import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

function PrivateRoute({ children }) {
  const auth = getCurrentUser();
  return auth ? 
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
