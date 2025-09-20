import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardGrid from './components/DashboardGrid';

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