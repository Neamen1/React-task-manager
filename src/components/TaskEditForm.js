import React, { useState } from 'react';
import './TaskEditForm.css';

function TaskEditForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [progress, setProgress] = useState(task.progress);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...task,
      title,
      description,
      status,
      progress
    });
  };

  return (
    <div className="task-edit-form">
      <div className="task-edit-form-content">
        <span className="close-button" onClick={onCancel}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description:
            <input type="text" value={description} placeholder="Title" onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </label>
          <label>
            Progress:
            <input type="text" value={progress} placeholder="progress" onChange={(e) => {
                const re = /^[0-9\b]+$/;
                // if value is not blank, then test the regex

                if (e.target.value === '' || re.test(e.target.value)) {
                  setProgress(e.target.value)
                }
              }} />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default TaskEditForm;
