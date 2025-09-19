// src/App.js
import React, { useState } from "react";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  
  return (
    <>
      {!user ? (
        <Auth onLogin={setUser} isLogin={isLogin} setIsLogin={setIsLogin} />
      ) : (
        <Dashboard user={user} onLogout={() => setUser(null)} />
      )}
    </>
  );
}