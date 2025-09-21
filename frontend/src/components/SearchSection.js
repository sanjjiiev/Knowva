import React, { useState } from "react";

const SearchSection = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) onSearch(searchInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit(e);
  };

  return (
    <section className="search-section mb-4">
      <div className="container flex gap-2">
        <input
          type="text"
          className="form-control flex-1"
          placeholder="Search for topics or learning resources..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn--primary" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchSection;
