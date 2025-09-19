// src/pages/MainContent.js
import React from "react";
import ChatBotSidebar from "./ChatBotSidebar";
import Profile from "./Profile";
import ProgressPie from "./ProgressPie";
import Analytics from "./Analytics";

export default function MainContent({ user, activeView }) {
  const renderContent = () => {
    switch(activeView) {
      case "profile":
        return <Profile user={user} />;
      case "progress":
        return <ProgressPie />;
      case "analytics":
        return <Analytics />;
      case "chat":
      default:
        return <ChatBotSidebar user={user} />;
    }
  };

  return (
    <div className="flex-1 p-6">
      {renderContent()}
    </div>
  );
}