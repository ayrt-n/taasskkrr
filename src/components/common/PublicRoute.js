import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

function PublicRoute({ children }) {
  const auth = getCurrentUser();
  return auth ? <Navigate to="/app" /> : children
}

export default PublicRoute;
