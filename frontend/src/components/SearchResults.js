import React from 'react';

const SearchResults = ({ query, results, onBackToHome }) => {
  return (
    <div className="search-results-page">
      <div className="search-results-header flex items-center gap-16 mb-16">
        <button className="btn btn--outline btn--sm" onClick={onBackToHome}>
          ← Back to Home
        </button>
        <h2 className="text-primary">Search Results for: "{query}"</h2>
      </div>

      <p className="text-secondary mb-16">Found {results.length} resources</p>

      {results.length === 0 ? (
        <div className="card text-center">
          <div className="card__body">
            <h3>Searching.....</h3>
          </div>
        </div>
      ) : (
        results.map((r, i) => (
          <div key={i} className="card mb-16">
            <div className="card__body">
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="result-title mb-8"
              >
                {r.title}
              </a>
              <p className="result-snippet mb-8">{r.snippet}</p>
              <span className="text-secondary text-sm italic">
                {r.source || 'Source Unknown'}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
