import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import { getCurrentUser, logout } from './services/authService';
import EmailConfirmation from './components/EmailConfirmation';
import EmailConfirmationForm from './components/EmailConfirmationForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AuthVerify from './components/common/AuthVerify';
import eventBus from './components/common/EventBus';
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const routerNavigate = useNavigate();

  // THIS WASNT WORKING WHEN NAVIGATING BETWEEN URLS WITH NO API REQUESTS
  const logOut = useCallback(() => {
    logout();
    setCurrentUser(null);
    routerNavigate('/login');
    window.location.reload();
  }, [routerNavigate])

  // On render, get and set currentUser using authService (localStorage)
  useEffect(() => {
    setCurrentUser(getCurrentUser())
  }, [])

  // Set up logOut listener, fired if token has expired
  useEffect(() => {
    eventBus.on('logout', () => {
      logOut();
    });

    return () => { eventBus.remove('logout') };
  }, [logOut]);

  return (
    <div className="App">
      <Navbar currentUser={currentUser} logOut={logOut} toggleSidebar={() => {setSidebarOpen(!sidebarOpen)}} />

      <div className="App-main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {currentUser ?
            <Route
              path="/*"
              element={<Dashboard sidebarOpen={sidebarOpen} closeSidebar={() => {setSidebarOpen(false)}} />}
            /> :
            <Route path="/" element={<HomePage />} />
          }
          <Route path="/api/v1/confirmation" element={<EmailConfirmation />} />
          <Route path="/confirmations" element={<EmailConfirmationForm />} />
          <Route path="api/v1/password/edit" element={<ResetPasswordForm />} />
          <Route path="/forgot_password" element={<ForgotPasswordForm />} />
        </Routes>
      </div>
      
      <AuthVerify logOut={logOut} />
    </div>
  );
}

export default App;
