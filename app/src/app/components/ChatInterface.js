import { useRef, useEffect } from 'react';
import styles from '../styles/home.module.css';

export default function ChatInterface({ messages, inputValue, setInputValue, handleSend, handleKeyDown }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // We filter the welcome message here to keep the logic contained.
  const filteredMessages = messages.filter(m => !(m.sender === 'bot' && m.text === 'Welcome to ChatApp!'));

  return (
    <div className={styles.chatContainer}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
        {messages.length === 1 && messages[0].sender === 'bot' ? (
          <div className={styles.welcomeSection}>
            <h2 className={styles.welcomeTitle}>Welcome to ChatApp</h2>
            <p className={styles.welcomeSubtitle}>Start a new conversation or pick up where you left off.</p>
          </div>
        ) : (
          filteredMessages.map(({ id, text, sender }) => (
            <div
              key={id}
              style={{
                display: 'flex',
                justifyContent: sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  maxWidth: '70%',
                  padding: '0.75rem 1rem',
                  borderRadius: '1rem',
                  backgroundColor: sender === 'user' ? '#197fe6' : '#f1f3f5',
                  color: sender === 'user' ? 'white' : '#212529',
                  fontWeight: 500,
                  boxShadow: sender === 'user' ? '0 2px 8px rgba(25, 127, 230, 0.4)' : 'none',
                }}
              >
                {text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <input
          className={styles.messageInput}
          placeholder="Send a message..."
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,60.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}