import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Sahayatri</h1>
          <p className="hero-subtitle">
            Connect with colleagues in your area and travel together to the office. 
            Save money, reduce carbon footprint, and make your commute more enjoyable.
          </p>
          <div className="mb-4">
            <Link to="/register" className="btn btn-primary" style={{ marginRight: '1rem' }}>
              Get Started
            </Link>
            <Link to="/find-users" className="btn btn-secondary">
              Find Travel Buddies
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg">
                  <span className="feature-icon">📍</span>
                </div>
              </div>
              <h3 className="feature-title">Location Based</h3>
              <p className="feature-text">
                Find colleagues living nearby and heading to the same office
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg">
                  <span className="feature-icon">🚗</span>
                </div>
              </div>
              <h3 className="feature-title">Multiple Options</h3>
              <p className="feature-text">
                Choose between car, bike, or public transport sharing
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg">
                  <span className="feature-icon">👥</span>
                </div>
              </div>
              <h3 className="feature-title">Build Community</h3>
              <p className="feature-text">
                Connect with colleagues and make your commute social
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <div className="feature-icon-bg">
                  <span className="feature-icon">⏰</span>
                </div>
              </div>
              <h3 className="feature-title">Flexible Timing</h3>
              <p className="feature-text">
                Match with colleagues who share your schedule
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
