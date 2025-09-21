'use client';

import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

function ActivitiesChartCard() {
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const years = [2023, 2024, 2025]; // Last three years

  useEffect(() => {
    // Generate contribution data for the selected year
    const contributions = [];
    const startDate = new Date(selectedYear, 0, 1);
    const endDate = new Date(selectedYear, 11, 31);
    const daysDiff = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i <= daysDiff; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Skip if it's not in the current year (edge case for Dec 31)
      if (date.getFullYear() !== selectedYear) continue;
      
      contributions.push({
        date,
        count: Math.floor(Math.random() * 6), // 0-5 activity level
      });
    }
    
    setData(contributions);
  }, [selectedYear]);

  // Group data by week (7 days per week)
  const weeks = [];
  for (let i = 0; i < 53; i++) {
    const weekData = data.slice(i * 7, (i + 1) * 7);
    if (weekData.length > 0) {
      weeks.push(weekData);
    }
  }

  // Get month labels for the grid
  const getMonthLabels = () => {
    const monthLabels = [];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let currentMonth = -1;
    
    // Find which month each week belongs to
    weeks.forEach((week, weekIndex) => {
      if (week.length > 0) {
        // Use the first available day in the week as reference
        const weekDate = week[0]?.date || new Date(selectedYear, 0, 1);
        const month = weekDate.getMonth();
        
        // Only label the first week of each month
        if (month !== currentMonth) {
          monthLabels[weekIndex] = monthNames[month];
          currentMonth = month;
        } else {
          monthLabels[weekIndex] = '';
        }
      }
    });
    
    return monthLabels;
  };

  // Calculate contributions for the selected year
  const calculateContributions = () => {
    return data.reduce((total, day) => total + day.count, 0);
  };

  return (
    <div className="card activities-card">
      <div className="card-header">
        <h3>Activities</h3>
        <div className="year-selector">
          <button 
            className="year-dropdown-toggle"
            onClick={() => setShowYearDropdown(!showYearDropdown)}
          >
            {selectedYear}
            <i className={`fas fa-chevron-${showYearDropdown ? 'up' : 'down'}`}></i>
          </button>
          {showYearDropdown && (
            <div className="year-dropdown">
              {years.map(year => (
                <div
                  key={year}
                  className={`year-option ${selectedYear === year ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedYear(year);
                    setShowYearDropdown(false);
                  }}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="contributions-info">
        <span className="contributions-count">{calculateContributions()} contributions</span> in the last year
      </div>

      <div className="activities-scroll-container">
        <div className="heatmap-wrapper">
          {/* Month labels row */}
          <div className="month-labels-row">
            <div className="day-label-spacer"></div>
            <div className="month-labels-scroll-container">
              <div className="month-labels">
                {getMonthLabels().map((month, index) => (
                  <div key={index} className="month-label-cell">
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main heatmap grid */}
          <div className="heatmap-content-container">
            {/* Day labels column (fixed) */}
            <div className="day-labels-column">
              <div className="day-label">Mon</div>
              <div className="day-label"></div>
              <div className="day-label">Wed</div>
              <div className="day-label"></div>
              <div className="day-label">Fri</div>
              <div className="day-label"></div>
              <div className="day-label"></div>
            </div>

            {/* Scrollable grid content */}
            <div className="heatmap-grid-scrollable">
              <div className="heatmap-grid">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="week-column">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className="heatmap-cell"
                        title={`${day.count} contributions on ${day.date.toDateString()}`}
                        data-level={day.count}
                      ></div>
                    ))}
                    {/* Fill empty cells if week has less than 7 days */}
                    {Array(7 - week.length).fill(0).map((_, index) => (
                      <div key={`empty-${index}`} className="heatmap-cell empty-cell"></div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Less/More scale */}
        <div className="chart-footer">
          <div className="contribution-info-link">
            <a href="#">Learn how we count contributions</a>
          </div>
          <div className="intensity-scale">
            <span>Less</span>
            <div className="intensity-levels">
              <div className="intensity-level" data-level="0"></div>
              <div className="intensity-level" data-level="1"></div>
              <div className="intensity-level" data-level="2"></div>
              <div className="intensity-level" data-level="3"></div>
              <div className="intensity-level" data-level="4"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivitiesChartCard;