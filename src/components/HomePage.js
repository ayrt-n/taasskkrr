import React from 'react';
import '../styles/Landing.css';
import logo from '../assets/icons/logo.svg';
import heroMain from '../assets/images/hero-main.png';
import smallExample1 from '../assets/images/mobile-example1.png';
import smallExample2 from '../assets/images/mobile-example2.png';
import { Link } from 'react-router-dom';

function HomePage() {
  return(
    <div className="Landing">
      {/* Main Section with Hero Text and Sign up link */}
      <div className="Landing-hero-text">
        <h1>Never miss a deadline again.</h1>
        <h2>Stay organized, focused, and get things done with Taasskkrr. The ultimate project management and to-do list application.</h2>
        <div>
          <Link to="/register" className="button is-primary">Get Started!</Link>
        </div>
        <div>
          <img src={logo} alt="" className="Landing-logo"/>
        </div>
      </div>

      {/* Wavy page break */}
      <section>
        <div className="Landing-wave">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      {/* Secondary section with example images */}
      <div className="Landing-secondary-section">
        <div className="Landing-hero-container">
          <img src={heroMain} alt="screenshot of the main dashboard for Taasskkrr" className="Landing-hero-main" />
        </div>

        <div className="Landing-two-grid">
          <div className="Landing-pitch-container">
            <p className="Landing-pitch-whisper">Productivity redefined</p>
            <h3>
              <span>Add your tasks.</span>
              <span>Manage your projects.</span>
              <span>Conquer the day.</span>
            </h3>
            <p className="Landing-pitch">
              Break bigger tasks down and keep them organized by creating separate projects and sections. Whether you're working on a big project at work, planning a party, or just trying to stay on top of your daily tasks, Taasskkrr has you covered.
            </p>
          </div>
          <img src={smallExample1}
            alt="screenshot of mobile view of Taasskkrr app viewing Personal project with a sub-section for Wellness"
            className="Landing-mobile-screen"
          />
        </div>
        
        <div className="Landing-two-grid reversed">
          <div className="Landing-pitch-container">
            <p className="Landing-pitch-whisper">Simplify your life</p>
            <h3>
              <span>All your tasks.</span>
              <span>All in one place.</span>
            </h3>
            <p className="Landing-pitch">
              Automatically sort and view upcoming tasks based on due date or filter by tasks for the current day. Taasskkrr makes it easy to prioritize your workload and ensure that you never miss a deadline again.
            </p>
          </div>
          <img src={smallExample2}
            alt="screenshot of mobile view of Taasskkrr app viewing Upcoming tasks"
            className="Landing-mobile-screen"
          />
        </div>

        <div className="Landing-cta">
          <h3>
            <span>Stop feeling overwhelmed.</span>
            <span>Stay organized and productive, easily with Taasskkrr.</span>
          </h3>
          
          <div>
            <Link to="/register" className="button is-primary">Get Started!</Link>
          </div>
        </div>
      </div>


      <section>
        <div className="Landing-wave inverted">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
            </svg>
        </div>
      </section>

      <footer className="Landing-footer">
        <span>Made with <span style={{color: "var(--red)"}}>❤️</span> by <a href="https://github.com/ayrt-n">Ayrton Parkinson</a></span>
      </footer>
    </div>
  );
}

export default HomePage;
