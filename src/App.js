import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import AuthService from './services/AuthService';
import AuthVerify from './components/common/AuthVerify';
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const routerNavigate = useNavigate();

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser())
  }, [])

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    routerNavigate('/login');
    window.location.reload();
  }

  return (
    <div className="App">
      <Navbar currentUser={currentUser} logOut={logOut} />

      <div className="App-main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {currentUser ?
            <Route path="/*" element={<Dashboard />} /> :
            <Route path="/" element={<HomePage />} />
          }
        </Routes>
      </div>
      
      <AuthVerify logOut={logOut} />
    </div>
  );
}

export default App;
