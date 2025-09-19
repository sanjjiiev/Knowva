// src/pages/Sidebar.js
import React from "react";

export default function Sidebar({ user, activeView, setActiveView, onLogout }) {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-xl font-bold flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded mr-2">🧠</span>
          DeepSeek Edu
        </h1>
        <p className="text-sm text-gray-400 mt-1">Welcome, {user}</p>
      </div>
      
      <div className="flex-1">
        <button
          className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeView === "chat" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setActiveView("chat")}
        >
          <span className="mr-2">💬</span> Chat
        </button>
        <button
          className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeView === "profile" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setActiveView("profile")}
        >
          <span className="mr-2">👤</span> Profile
        </button>
        <button
          className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeView === "progress" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setActiveView("progress")}
        >
          <span className="mr-2">📊</span> Progress
        </button>
        <button
          className={`w-full text-left py-3 px-4 rounded-lg mb-2 flex items-center ${activeView === "analytics" ? "bg-blue-600" : "hover:bg-gray-700"}`}
          onClick={() => setActiveView("analytics")}
        >
          <span className="mr-2">📈</span> Analytics
        </button>
      </div>
      
      <button
        className="w-full text-left py-3 px-4 rounded-lg mt-auto hover:bg-gray-700 flex items-center"
        onClick={onLogout}
      >
        <span className="mr-2">🚪</span> Logout
      </button>
    </div>
  );
}