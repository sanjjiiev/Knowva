import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CalendarCard() {
  return (
    <div className="card calendar-card">
      <div className="calendar-header">
        <div className="nav-arrows">
          <i className="fas fa-chevron-left"></i>
          <span className="month-year">June 2022</span>
          <i className="fas fa-chevron-right"></i>
        </div>
        <div className="nav-arrows">
          <span>3 month ago</span>
          <span>6 months</span>
          <span>1 Year</span>
        </div>
      </div>
      <div className="calendar-days-weekdays">
        <div className="day-name">Su</div>
        <div className="day-name">Mo</div>
        <div className="day-name">Tu</div>
        <div className="day-name">We</div>
        <div className="day-name">Th</div>
        <div className="day-name">Fr</div>
        <div className="day-name">Sa</div>
        
        {/* Days - use a loop in a real app */}
        <div className="day inactive">29</div>
        <div className="day inactive">30</div>
        <div className="day inactive">31</div>
        <div className="day">1</div>
        <div className="day">2</div>
        <div className="day has-task" data-date="2022-06-03">3</div>
        <div className="day">4</div>
        <div className="day">5</div>
        <div className="day">6</div>
        <div className="day">7</div>
        <div className="day">8</div>
        <div className="day">9</div>
        <div className="day">10</div>
        <div className="day current-day" data-date="2022-06-11">11</div>
        <div className="day">12</div>
        <div className="day has-task" data-date="2022-06-13">13</div>
        <div className="day has-task" data-date="2022-06-14">14</div>
        <div className="day">15</div>
        <div className="day">16</div>
        <div className="day">17</div>
        <div className="day">18</div>
        <div className="day">19</div>
        <div className="day">20</div>
        <div className="day">21</div>
        <div className="day">22</div>
        <div className="day">23</div>
        <div className="day">24</div>
        <div className="day">25</div>
        <div className="day">26</div>
        <div className="day">27</div>
        <div className="day">28</div>
        <div className="day">29</div>
        <div className="day">30</div>
        <div className="day inactive">1</div>
        <div className="day inactive">2</div>
      </div>
    </div>
  );
}

export default CalendarCard;