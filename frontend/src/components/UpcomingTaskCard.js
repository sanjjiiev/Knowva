import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function UpcomingTaskCard() {
  return (
    <div className="card upcoming-task-card">
      <div className="card-header">
        <h3>Upcoming Task</h3>
        <div className="dots-menu"><i className="fas fa-ellipsis-h"></i></div>
      </div>
      <div className="task-list">
        <div className="task-item">
          <div className="icon-circle"><i className="fas fa-code"></i></div>
          <div className="task-details">
            <h4>Binary Shorting</h4>
            <p>UI UX Design</p>
          </div>
          <span className="task-date">Due: 22 Jan 2024</span>
        </div>
        <div className="task-item">
          <div className="icon-circle"><i className="fas fa-puzzle-piece"></i></div>
          <div className="task-details">
            <h4>Component Creating</h4>
            <p>UI UX Design</p>
          </div>
          <span className="task-date">Due: 22 Jan 2024</span>
        </div>
        <div className="task-item">
          <div className="icon-circle"><i className="fas fa-link"></i></div>
          <div className="task-details">
            <h4>Linked List</h4>
            <p>Programming</p>
          </div>
          <span className="task-date">Due: 22 Jan 2024</span>
        </div>
      </div>
    </div>
  );
}

export default UpcomingTaskCard;