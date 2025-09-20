import React from 'react';
import './App.css';
import Header from '../components/Header.js';
import Sidebar from '../components/Sidebar.js';
import DashboardGrid from '../components/DashboardGrid.js';

function App() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <DashboardGrid />
      </main>
    </div>
  );
}

export default App;