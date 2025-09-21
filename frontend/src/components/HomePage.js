import React from 'react';
import ChatSection from './ChatSection';
import Sidebar from './Sidebar';

const HomePage = ({
  chatMessages,
  onSendMessage,
  tasks,
  onToggleTask,
  onDeleteTask,
  onAddTask,
  currentMonth,
  onNavigateMonth
}) => {
  return (
    <div className="home-layout">
      <div className="chat-section">
        <ChatSection
          messages={chatMessages}
          onSendMessage={onSendMessage}
        />
      </div>
      <div className="sidebar">
        <Sidebar
          tasks={tasks}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onAddTask={onAddTask}
          currentMonth={currentMonth}
          onNavigateMonth={onNavigateMonth}
        />
      </div>
    </div>
  );
};

export default HomePage;
