// src/pages/Auth.js
import React from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth({ onLogin, isLogin, setIsLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="flex mb-6 rounded-lg overflow-hidden">
          <button
            className={`flex-1 py-3 font-semibold ${isLogin ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 font-semibold ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        
        {isLogin ? (
          <Login onLogin={onLogin} />
        ) : (
          <Signup onLogin={onLogin} />
        )}
      </div>
    </div>
  );
}