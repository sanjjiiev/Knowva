import React from 'react';
import TaskList from './TaskList';
import Calendar from './Calendar';

const Sidebar = ({ 
  tasks, 
  onToggleTask, 
  onDeleteTask, 
  onAddTask, 
  currentMonth, 
  onNavigateMonth 
}) => {
  return (
    <div className="space-y-24">
      <div className="card">
        <div className="card__body">
          <div className="flex justify-between items-center mb-16">
            <h3>Tasks & Deadlines</h3>
            <button 
              className="btn btn--sm btn--primary"
              onClick={onAddTask}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Add Task
            </button>
          </div>
          <TaskList 
            tasks={tasks}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
          />
        </div>
      </div>

      <div className="card">
        <div className="card__body">
          <Calendar 
            currentMonth={currentMonth}
            onNavigateMonth={onNavigateMonth}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
