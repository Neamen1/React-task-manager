import React from 'react';
import './TaskComponent.css'; // Підключення стилів

function TaskComponent({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
      </div>
      {/* <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button> */}
    </div>
  );
}

export default TaskComponent;
