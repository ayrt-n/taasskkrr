import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/authService';
import eventBus from '../../components/common/EventBus';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const routerNavigate = useNavigate();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [routerNavigate]);

  // THIS WASNT WORKING WHEN NAVIGATING BETWEEN URLS WITH NO API REQUESTS
  const logOut = useCallback(() => {
    logout();
    setCurrentUser(null);
    routerNavigate('/login');
    window.location.reload();
  }, [routerNavigate])

  // Set up logOut listener, fired if token has expired
  useEffect(() => {
    eventBus.on('logout', () => {
      logOut();
    });

    return () => { eventBus.remove('logout') };
  }, [logOut]);

  const providerValues = useMemo(() => ({
    currentUser,
    logOut,
  }), [currentUser, logOut]);

  return (
    <AuthContext.Provider value={providerValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
