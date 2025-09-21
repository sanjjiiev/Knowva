import styles from '../styles/home.module.css';
import ChatInterface from './ChatInterface';
import Calendar from './Calendar';

export default function MainContent({
  messages,
  inputValue,
  setInputValue,
  handleSend,
  handleKeyDown,
  setIsSearchOpen,
}) {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <nav className={styles.nav}>
            <a className={styles.navLinkActive} href="#">Home</a>
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

      <div className={styles.content}>
        <ChatInterface
          messages={messages}
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSend={handleSend}
          handleKeyDown={handleKeyDown}
        />
        <Calendar />
      </div>
    </main>
  );
}