// src/pages/Dashboard.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function Dashboard({ user, onLogout }) {
  const [activeView, setActiveView] = useState("chat");
  
  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar 
        user={user} 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={onLogout}
      />
      <MainContent 
        user={user} 
        activeView={activeView}
      />
    </div>
  );
}