import React from 'react';

const Home = () => {
  return (
    <div className="home-card">
      <h2>Welcome to Cognizant Academy Trainer Portal</h2>
      <p className="home-desc">
        This platform serves as the central directory for all Cognizant Academy trainers. 
        Explore our cohort trainers, their tech streams, and specialized skills to optimize academy scheduling.
      </p>
      <div className="home-stats">
        <div className="stat-box">
          <span className="stat-num">3+</span>
          <span className="stat-label">Active Domains</span>
        </div>
        <div className="stat-box">
          <span className="stat-num">50+</span>
          <span className="stat-label">Trained Cohorts</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
