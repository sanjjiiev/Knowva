import React from 'react';

function WelcomeCard() {
  return (
    <div className="card welcome-card">
      <div className="top-section">
        <div className="text-content">
          <h3>Welcome Back !</h3>
          <p>Professional Certificates offer flexible, online training designed to get you job-ready for high-growth fields.</p>
          <div className="course-progress-label">Course Progress</div>
        </div>
        <div className="illustration-img">
          <img src="https://via.placeholder.com/180x150/6A5ACD/FFFFFF?text=Welcome+Illustration" alt="Welcome Illustration" />
        </div>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar"></div>
      </div>
    </div>
  );
}

export default WelcomeCard;