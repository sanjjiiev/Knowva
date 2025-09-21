'use client';

import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

function ChatToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello 👋! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: `You said: "${input}"` }
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        className={`chat-toggle-btn ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'}`}></i>
      </button>

      {/* Chat Sidebar */}
      <aside
        className={`chat-sidebar ${isOpen ? 'active' : ''} ${isFullscreen ? 'fullscreen' : ''
          }`}
      >
        <div className="chat-header">
          <i className="fas fa-robot"></i>
          <span>AI Assistant</span>
          <button
            className="fullscreen-btn"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
          </button>
        </div>

        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </aside>
    </>
  );
}

export default ChatToggle;
