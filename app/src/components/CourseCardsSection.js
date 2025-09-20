import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

function CourseCardsSection() {
  return (
    <div className="course-cards-section">
      <div className="course-card">
        <div className="thumbnail">
          <img src="https://via.placeholder.com/100x80/3A3D52/FFFFFF?text=UI" alt="Course Thumbnail" />
        </div>
        <h4>Web Development</h4>
        <p className="instructor">John Smith</p>
        <div className="course-stats">
          <div><i className="fas fa-users"></i> 8</div>
          <div><i className="fas fa-star"></i> 4</div>
          <div className="progress-percent">68%</div>
        </div>
      </div>
      <div className="course-card">
        <div className="thumbnail">
          <img src="https://via.placeholder.com/100x80/3A3D52/FFFFFF?text=UX" alt="Course Thumbnail" />
        </div>
        <h4>UI UX Design System</h4>
        <p className="instructor">John Smith</p>
        <div className="course-stats">
          <div><i className="fas fa-users"></i> 8</div>
          <div><i className="fas fa-star"></i> 4</div>
          <div className="progress-percent">68%</div>
        </div>
      </div>
      <div className="course-card">
        <div className="thumbnail">
          <img src="https://via.placeholder.com/100x80/3A3D52/FFFFFF?text=Web" alt="Course Thumbnail" />
        </div>
        <h4>Web Development</h4>
        <p className="instructor">John Smith</p>
        <div className="course-stats">
          <div><i className="fas fa-users"></i> 8</div>
          <div><i className="fas fa-star"></i> 4</div>
          <div className="progress-percent">68%</div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardsSection;