'use client';

import { useState } from 'react';
import styles from './styles/home.module.css';
import SearchModal from './components/SearchModal.js';
import Sidebar from './components/Sidebar.js';
import MainContent from './components/MainContent.js';

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to ChatApp!', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const botReply = {
        id: Date.now() + 1,
        text: "Thanks for your message! This is an automated reply.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.appContainer}>
          <Sidebar />
          <MainContent
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSend={handleSend}
            handleKeyDown={handleKeyDown}
            setIsSearchOpen={setIsSearchOpen}
          />
        </div>
      </div>
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}