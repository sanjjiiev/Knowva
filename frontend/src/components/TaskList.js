import React from 'react';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const upcomingTasks = tasks
    .filter(task => !task.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days`;

    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'status--error';
      case 'medium': return 'status--warning';
      case 'low': return 'status--info';
      default: return 'status--info';
    }
  };

  if (upcomingTasks.length === 0) {
    return (
      <div className="text-center py-16 text-secondary">
        <p>No upcoming tasks</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {upcomingTasks.map(task => (
        <div key={task.id} className="task-item">
          <div className="flex items-start gap-12">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleTask(task.id)}
              className="task-checkbox"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h4 className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </h4>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="btn-icon btn-icon--sm text-error"
                  title="Delete task"
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="flex items-center justify-between mt-8">
                <span className={`status ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className="task-due-date">
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
