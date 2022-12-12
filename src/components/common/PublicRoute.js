import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/authentication/AuthContext';

function PublicRoute({ children }) {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/app" /> : children
}

export default PublicRoute;
