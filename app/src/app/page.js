'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './styles/home.module.css';
import SearchModal from './components/SearchModal.js';

export default function Home() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Welcome to ChatApp!', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Bot reply after 1 second
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
    <> {/* Use a Fragment to wrap your page and the modal */}
      <div className={styles.container}>
        <div className={styles.appContainer}>
          {/* --- Sidebar --- */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <div className={styles.logo}>
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd"
                    d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z"
                    fill="currentColor" fillRule="evenodd"></path>
                </svg>
              </div>
              <h1 className={styles.appTitle}>LEARN</h1>
            </div>
            <div className={styles.sidebarMenu}>
              <button className={`${styles.menuButton} ${styles.primaryButton}`}>
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                </svg>
                New Chat
              </button>
              <button className={styles.menuButton}>
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z"></path>
                </svg>
                History
              </button>
            </div>
          </aside>

          <main className={styles.main}>
            <header className={styles.header}>
              <div className={styles.headerLeft}>
                {/* ... */}
                <nav className={styles.nav}>
                  <a className={styles.navLinkActive} href="#">Home</a>
                  {/* 3. Add onClick to the Search link */}
                  <a className={styles.navLink} href="#" onClick={() => setIsSearchOpen(true)}>
                    Search
                  </a>
                </nav>
              </div>
              <button className={styles.accountButton}>
                <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128,24a104,104,0,1,0,104,104A104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-42.44-34.82,48,48,0,1,0-58.64,0,79.66,79.66,0,0,0-42.44,34.82,88,88,0,1,1,143.52,0Z"></path>
                </svg>
                Account
              </button>
            </header>

            {/* --- Main Content --- */}
            <div className={styles.content}>
              <div className={styles.chatContainer}>
                <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
                  {messages.length === 1 && messages[0].sender === 'bot' ? (
                    <div className={styles.welcomeSection}>
                      <h2 className={styles.welcomeTitle}>Welcome to ChatApp</h2>
                      <p className={styles.welcomeSubtitle}>Start a new conversation or pick up where you left off.</p>
                    </div>
                  ) : (
                    messages
                      .filter(m => !(m.sender === 'bot' && m.text === 'Welcome to ChatApp!'))
                      .map(({ id, text, sender }) => (
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
              <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                  <p className={styles.calendarMonth}>July 2024</p>
                  <div className={styles.calendarControls}>
                    <button className={styles.calendarButton}>
                      <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
                      </svg>
                    </button>
                    <button className={styles.calendarButton}>
                      <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className={styles.calendarGrid}>
                  <p className={styles.weekday}>S</p>
                  <p className={styles.weekday}>M</p>
                  <p className={styles.weekday}>T</p>
                  <p className={styles.weekday}>W</p>
                  <p className={styles.weekday}>T</p>
                  <p className={styles.weekday}>F</p>
                  <p className={styles.weekday}>S</p>

                  <div className={`${styles.calendarDay} ${styles.calendarDayOffset}`}>1</div>
                  <div className={styles.calendarDay}>2</div>
                  <div className={styles.calendarDay}>3</div>
                  <div className={styles.calendarDay}>4</div>
                  <div className={`${styles.calendarDay} ${styles.calendarDayCurrent}`}>5</div>
                  <div className={styles.calendarDay}>6</div>
                  <div className={styles.calendarDay}>7</div>
                  <div className={styles.calendarDay}>8</div>
                  <div className={styles.calendarDay}>9</div>
                  <div className={styles.calendarDay}>10</div>
                  <div className={styles.calendarDay}>11</div>
                  <div className={styles.calendarDay}>12</div>
                  <div className={styles.calendarDay}>13</div>
                  <div className={styles.calendarDay}>14</div>
                  <div className={styles.calendarDay}>15</div>
                  <div className={styles.calendarDay}>16</div>
                  <div className={styles.calendarDay}>17</div>
                  <div className={styles.calendarDay}>18</div>
                  <div className={styles.calendarDay}>19</div>
                  <div className={styles.calendarDay}>20</div>
                  <div className={styles.calendarDay}>21</div>
                  <div className={styles.calendarDay}>22</div>
                  <div className={styles.calendarDay}>23</div>
                  <div className={styles.calendarDay}>24</div>
                  <div className={styles.calendarDay}>25</div>
                  <div className={styles.calendarDay}>26</div>
                  <div className={styles.calendarDay}>27</div>
                  <div className={styles.calendarDay}>28</div>
                  <div className={styles.calendarDay}>29</div>
                  <div className={styles.calendarDay}>30</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* 4. Conditionally render the modal */}
      {isSearchOpen && <SearchModal onClose={() => setIsSearchOpen(false)} />}
    </>
  );
}
