import React, { useState } from 'react';

const TaskModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date must be today or in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSave(formData);
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium'
      });
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="modal-header">
          <h3>Add New Task</h3>
          <button 
            className="btn-icon"
            onClick={onClose}
            type="button"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className={`form-control ${errors.title ? 'error' : ''}`}
                placeholder="Enter task title"
                value={formData.title}
                onChange={handleChange}
                autoFocus
              />
              {errors.title && (
                <div className="form-error">{errors.title}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className={`form-control ${errors.description ? 'error' : ''}`}
                placeholder="Enter task description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <div className="form-error">{errors.description}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="dueDate">
                Due Date *
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className={`form-control ${errors.dueDate ? 'error' : ''}`}
                min={today}
                value={formData.dueDate}
                onChange={handleChange}
              />
              {errors.dueDate && (
                <div className="form-error">{errors.dueDate}</div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="priority">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button 
              type="button"
              className="btn btn--outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="btn btn--primary"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
