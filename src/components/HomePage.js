import React from 'react';
import '../styles/Landing.css';
import logo from '../assets/icons/logo.svg';
import heroMain from '../assets/images/hero-main.png';
import smallExample1 from '../assets/images/mobile-example1.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return(
    <div className="Landing">
      {/* Main Section with Hero Text and Sign up link */}
      <div className="Landing-hero-text">
        <h1>Never miss a deadline again.</h1>
        <h2>Stay organized, focused, and get things done with Taasskkrr. The ultimate to-do list application.</h2>
        <div>
          <Link to="/register" className="button is-primary">Get Started!</Link>
        </div>
        <div>
          <img src={logo} alt="" className="Landing-logo"/>
        </div>
      </div>

      {/* Secondary section with example images */}
      <div className="Landing-secondary-section">
        <div className="Landing-hero-container">
          <img src={heroMain} alt="screenshot of the main dashboard for Taasskkrr" className="Landing-hero-main" />
        </div>
        <div className="Landing-two-grid">
          <div className="Landing-pitch-container">
            <p className="Landing-pitch-whisper">Simplify your life</p>
            <h3>
              <span>Add your tasks.</span>
              <span>Organize your life.</span>
              <span>Achieve more every day.</span>
            </h3>
            <p className="Landing-pitch">
              Break bigger tasks down and keep them organized by creating separate projects. Whether you're working on a big project at work, planning a party, or just trying to stay on top of your daily tasks, our app has you covered.
            </p>
          </div>
          <img src={smallExample1}
            alt="screenshot of mobile view of Taasskkrr app viewing more details of a task"
            className="Landing-mobile-screen"
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
