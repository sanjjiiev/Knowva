import React from 'react';

const SearchResults = ({ query, results, onBackToHome }) => {
  return (
    <div className="search-results-page">
      <div className="search-results-header flex items-center gap-4 mb-4">
        <button className="btn btn--outline btn--sm" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <h2>Search Results for: "{query}"</h2>
      </div>

      <p className="text-secondary mb-4">Found {results.length} resources</p>

      {results.length === 0 ? (
        <div className="card p-8 text-center">
          <h3>No results found</h3>
        </div>
      ) : (
        results.map((r, i) => (
          <div key={i} className="card mb-4 p-4">
            <h3 className="text-blue-600 font-bold mb-1">
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
            </h3>
            <p className="text-gray-700 mb-1">{r.snippet}</p>
            <span className="text-sm italic">{r.source || "Source Unknown"}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
