import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Sidebar() {
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(true);

  const toggleCourseMenu = () => {
    setIsCourseMenuOpen(!isCourseMenuOpen);
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon-placeholder">
          <img src="https://via.placeholder.com/40" alt="Logo" />
        </div>
        <span>Shikbo Bhai</span>
      </div>

      <nav className="sidebar-menu">
        <a href="#" className="menu-item active">
          <i className="fas fa-th-large"></i>
          <span>Dashboard</span>
        </a>
        <a 
          href="#" 
          className={`menu-item has-submenu ${isCourseMenuOpen ? 'open' : ''}`} 
          onClick={toggleCourseMenu}
        >
          <i className="fas fa-book"></i>
          <span>Course</span>
          <span className="chevron"><i className="fas fa-chevron-right"></i></span>
        </a>
        <div className="submenu" style={{ maxHeight: isCourseMenuOpen ? '150px' : '0' }}>
          <a href="#" className="submenu-item">All Courses</a>
          <a href="#" className="submenu-item">My Courses</a>
          <a href="#" className="submenu-item">Explore</a>
        </div>
        <a href="#" className="menu-item">
          <i className="fas fa-layer-group"></i>
          <span>Resource</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-tasks"></i>
          <span>Task</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-chart-line"></i>
          <span>Statistics</span>
        </a>
        <a href="#" className="menu-item">
          <i className="fas fa-calendar-alt"></i>
          <span>Calendar</span>
        </a>
      </nav>

      <div className="upgrade-card">
        <div className="illustration">
          <img src="https://via.placeholder.com/120x100/6A5ACD/FFFFFF?text=Illustration" alt="Upgrade Plus" />
        </div>
        <h4>Upgrade Plus</h4>
        <p>45% <br /> Discount</p>
        <a href="#" className="btn">Get Now</a>
      </div>
    </aside>
  );
}

export default Sidebar;