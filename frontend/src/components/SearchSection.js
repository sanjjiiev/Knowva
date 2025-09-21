import React, { useState } from 'react';

const SearchSection = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchInput);
    }
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search for learning resources, topics, or ask a question..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="btn btn--primary search-btn"
            onClick={handleSubmit}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
