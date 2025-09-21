import React from 'react';
import styles from '../styles/SearchModal.module.css';

const SearchModal = ({ onClose }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                {/* Search Input */}
                <div className={styles.searchBar}>
                    <svg fill="none" stroke="currentColor" strokeWidth="1.5" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <input type="text" placeholder="Search conversations or topics..." className={styles.searchInput} autoFocus />
                </div>

                {/* Recent Searches */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Recent Searches</h3>
                    <ul className={styles.recentList}>
                        <li className={styles.recentItem}>
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Marketing campaign brainstorming</span>
                        </li>
                        <li className={styles.recentItem}>
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Code review feedback for new feature</span>
                        </li>
                        <li className={styles.recentItem}>
                            <svg fill="none" stroke="currentColor" strokeWidth="1.5" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Travel plans for summer vacation</span>
                        </li>
                    </ul>
                </div>

                {/* Suggested Topics */}
                <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>Suggested Topics</h3>
                    <div className={styles.topicsContainer}>
                        <button className={styles.topicTag}>Productivity Hacks</button>
                        <button className={styles.topicTag}>Creative Writing</button>
                        <button className={styles.topicTag}>Learn a New Language</button>
                        <button className={styles.topicTag}>Healthy Recipes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;