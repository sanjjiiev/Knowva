import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>AI Learning Assistant</h1>
          </div>
          <div className="flex items-center gap-16">
            <span className="status status--success">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
