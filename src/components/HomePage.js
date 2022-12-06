import React from 'react';
import '../styles/Landing.css';
import heroMain from '../assets/images/hero-main.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return(
    <div className="Landing">
      <div className="Landing-hero-text">
        <h1>Tired of losing track? Organize your work and life, finally.</h1>
        <h2>Become focused, organized, and calm with Taasskkrr. What are you waiting for?</h2>
        <div>
          <Link to="/register" className="button is-primary">Get Started!</Link>
        </div>
      </div>
      <div className="Landing-hero-container">
        <img src={heroMain} alt="" className="Landing-hero-main" />
      </div>
    </div>
  );
}

export default HomePage;
