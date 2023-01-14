import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';
import EmailConfirmation from './components/EmailConfirmation';
import EmailConfirmationForm from './components/EmailConfirmationForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import AuthProvider from './contexts/authentication/AuthProvider';
import AuthVerify from './components/common/AuthVerify';
import './styles/App.css'
import NotFound from './components/status_errors/NotFound';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="App">
        <Navbar toggleSidebar={() => {setSidebarOpen(!sidebarOpen)}} />

        <div className="App-main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <PublicRoute>
                  <HomePage />
                </PublicRoute>
              }
            />
            <Route
              path="/api/v1/confirmation"
              element={
                <PublicRoute>
                  <EmailConfirmation />
                </PublicRoute>
              }
            />
            <Route
              path="/confirmations"
              element={
                <PublicRoute>
                  <EmailConfirmationForm />
                </PublicRoute>
              }
            />
            <Route
              path="api/v1/password/edit"
              element={
                <PublicRoute>
                  <ResetPasswordForm />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot_password"
              element={
                <PublicRoute>
                  <ForgotPasswordForm />
                </PublicRoute>
              }
            />
            
            {/* Private Routes */}
            <Route
              path="/app/*"
              element={
                <PrivateRoute>
                  <Dashboard sidebarOpen={sidebarOpen} closeSidebar={() => {setSidebarOpen(false)}} />
                </PrivateRoute>
              }
            />

            {/* Catch all 404 - Not Found */}
            <Route
              path="*"
              element = {<NotFound />}
            />
          </Routes>
        </div>
        
        <AuthVerify />
      </div>
    </AuthProvider>
  );
}

export default App;
