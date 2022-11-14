import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Navbar from './components/navbar/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import AuthService from './services/AuthService';
import './styles/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser())
  }, [])

  return (
    <div className="App">
      <Navbar currentUser={currentUser} />
      <div className="App-main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {currentUser ?
            <Route path="/*" element={<Dashboard projects={[]} />} /> :
            <Route path="/" element={<HomePage />} />
          }
        </Routes>
      </div>
    </div>
  );
}

export default App;
