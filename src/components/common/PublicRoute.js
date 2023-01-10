import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { pingService } from '../../services/pingService';
import AuthContext from '../../contexts/authentication/AuthContext';

function PublicRoute({ children }) {
  // Ping server to wake up heroku
  pingService();

  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Navigate to="/app" /> : children
}

export default PublicRoute;
