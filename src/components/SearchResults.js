import React, { useState, useEffect } from 'react';

const SearchResults = ({ query, results, filters, onFiltersChange, onBackToHome }) => {
  const [filteredResults, setFilteredResults] = useState(results);

  const subjects = ["Mathematics", "Physics", "Computer Science", "Languages", "History", "Biology", "Chemistry", "Philosophy"];
  const resourceTypes = ["Video Course", "Interactive Lessons", "Course Materials", "Mobile App", "Video", "Practice Problems", "Study Guides"];
  const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

  useEffect(() => {
    let filtered = results.filter(result => 
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.snippet.toLowerCase().includes(query.toLowerCase())
    );

    if (filters.subject) {
      filtered = filtered.filter(result => result.subject === filters.subject);
    }
    if (filters.type) {
      filtered = filtered.filter(result => result.type === filters.type);
    }
    if (filters.level) {
      filtered = filtered.filter(result => result.level === filters.level);
    }

    setFilteredResults(filtered);
  }, [query, results, filters]);

  const handleFilterChange = (filterType, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    onFiltersChange({ subject: '', type: '', level: '' });
  };

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <div className="flex items-center gap-16 mb-16">
          <button 
            className="btn btn--outline btn--sm"
            onClick={onBackToHome}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
            Back to Home
          </button>
          <h2>Search Results for: "{query}"</h2>
        </div>
        <p className="text-secondary mb-24">Found {filteredResults.length} resources</p>
      </div>

      <div className="search-layout">
        {/* Filters Sidebar */}
        <div className="search-filters">
          <div className="card">
            <div className="card__body">
              <div className="flex items-center justify-between mb-16">
                <h3>Filters</h3>
                {(filters.subject || filters.type || filters.level) && (
                  <button 
                    className="btn btn--sm btn--outline"
                    onClick={clearFilters}
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select 
                  className="form-control"
                  value={filters.subject}
                  onChange={(e) => handleFilterChange('subject', e.target.value)}
                >
                  <option value="">All Subjects</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Resource Type</label>
                <select 
                  className="form-control"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  {resourceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Level</label>
                <select 
                  className="form-control"
                  value={filters.level}
                  onChange={(e) => handleFilterChange('level', e.target.value)}
                >
                  <option value="">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="search-results">
          {filteredResults.length === 0 ? (
            <div className="card">
              <div className="card__body text-center py-32">
                <h3>No results found</h3>
                <p className="text-secondary">
                  Try adjusting your search query or filters
                </p>
              </div>
            </div>
          ) : (
            <div className="results-list">
              {filteredResults.map(result => (
                <div key={result.id} className="card result-card">
                  <div className="card__body">
                    <div className="flex items-start justify-between gap-16">
                      <div className="flex-1">
                        <h3 className="result-title mb-8">
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-hover"
                          >
                            {result.title}
                          </a>
                        </h3>
                        <p className="result-snippet mb-12">
                          {result.snippet}
                        </p>
                        <div className="flex items-center gap-8">
                          <span className="status status--info">
                            {result.subject}
                          </span>
                          <span className="status status--secondary">
                            {result.type}
                          </span>
                          <span className="status status--secondary">
                            {result.level}
                          </span>
                        </div>
                      </div>
                      <div className="result-actions">
                        <a 
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="btn btn--outline btn--sm"
                        >
                          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                            <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
                          </svg>
                          Visit
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredResults.length > 0 && (
            <div className="pagination-container">
              <div className="pagination">
                <button className="btn btn--outline btn--sm" disabled>
                  ← Previous
                </button>
                <span className="pagination-info">
                  Page 1 of 1
                </span>
                <button className="btn btn--outline btn--sm" disabled>
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
