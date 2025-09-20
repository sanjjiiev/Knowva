'use client';

import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

function Sidebar() {
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
    <aside className="sidebar chat-sidebar">
      <div className="chat-header">
        <i className="fas fa-robot"></i>
        <span>AI Assistant</span>
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
  );
}

export default Sidebar;