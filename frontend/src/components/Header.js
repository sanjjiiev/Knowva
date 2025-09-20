import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="user-controls">
        <button className="icon-btn"><i className="fas fa-bell"></i></button>
        <button className="icon-btn"><i className="fas fa-cog"></i></button>
        <div className="user-profile">
          <div className="avatar">
            <img src="https://via.placeholder.com/38" alt="User Avatar" />
          </div>
          <span>Muntasir</span>
          <i className="fas fa-chevron-down" style={{ fontSize: '12px', marginLeft: '8px', color: 'var(--light-text-color)' }}></i>
        </div>
      </div>
    </header>
  );
}

export default Header;