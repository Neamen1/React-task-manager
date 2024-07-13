import React, { useState } from 'react';
import './TaskComponentWithButtons.css'; // Підключення стилів



function TaskComponent({ task, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id) => {
    setIsDeleting(true);
    setTimeout(() => onDelete(id), 400); // Delay the actual deletion
  }
  return (
    <div className={`task-card ${isDeleting ? 'deleting' : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
      </div>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => handleDelete(task.id)}>Delete</button>
    </div>
  );
}

export default TaskComponent;
