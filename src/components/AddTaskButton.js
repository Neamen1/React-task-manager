import React from 'react';
import './AddTaskButton.css';

function AddTaskButton({ onClick }) {
  return (
    <button className="add-task-button" onClick={onClick}>
      +
    </button>
  );
}

export default AddTaskButton;
