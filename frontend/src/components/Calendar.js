// components/Calendar.js
import React from 'react';

const Calendar = ({ currentMonth, onNavigateMonth, tasks, selectedDate, onSelectDate }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = [];
  const currentDate = new Date(startDate);

  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const dayDate = new Date(currentDate);
      const isCurrentMonth = dayDate.getMonth() === month;
      const isToday = dayDate.getTime() === today.getTime();
      const isSelected = selectedDate && dayDate.getTime() === new Date(selectedDate).setHours(0, 0, 0, 0);

      const dayTasks = tasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.setHours(0, 0, 0, 0) === dayDate.getTime();
      });

      weekDays.push({
        date: dayDate,
        day: dayDate.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        hasTasks: dayTasks.length > 0,
        tasks: dayTasks
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }
    calendarDays.push(weekDays);
    if (currentDate.getMonth() !== month && week >= 4) break;
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="btn btn--sm btn--outline" onClick={() => onNavigateMonth(-1)}>
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" /></svg>
        </button>
        <h4 className="calendar-title">{monthNames[month]} {year}</h4>
        <button className="btn btn--sm btn--outline" onClick={() => onNavigateMonth(1)}>
          <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" /></svg>
        </button>
      </div>

      <div className="calendar-grid">
        {dayNames.map(day => <div key={day} className="calendar-day-header">{day}</div>)}
        {calendarDays.map((week, weekIndex) =>
          week.map((dayData, dayIndex) => (
            <div
              key={`${weekIndex}-${dayIndex}`}
              className={`calendar-day ${!dayData.isCurrentMonth ? 'other-month' : ''} ${dayData.isToday ? 'today' : ''} ${dayData.isSelected ? 'selected' : ''} ${dayData.hasTasks ? 'has-tasks' : ''}`}
              // onClick={() => onSelectDate(dayData.date)}
              title={dayData.hasTasks ? `${dayData.tasks.length} task${dayData.tasks.length > 1 ? 's' : ''}` : ''}
            >
              <span className="day-number">{dayData.day}</span>
              {dayData.hasTasks && (
                <div className="task-indicators">
                  {dayData.tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className={`task-dot task-dot--${task.priority}`} />
                  ))}
                  {dayData.tasks.length > 3 && (
                    <div className="task-more">+{dayData.tasks.length - 3}</div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;