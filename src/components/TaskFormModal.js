import React, { useState } from 'react';
import './TaskFormModal.css';

function TaskFormModal({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [progress, setProgress] = useState(0);

  // Function to reset all input fields
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('draft');
    setProgress(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, status,progress });
    //    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:<br/>
            <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Description:<br/>
            <input type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
          </label>
          
          <label>
            Status:<br/>
            <select value={status} onChange={(e) => setStatus(e.target.value)} data-testid="select-option">
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
          <button type="submit">Add Task</button>
          <button type="button" onClick={resetForm}>Clear Form</button>

        </form>
      </div>
    </div>
  );
}

export default TaskFormModal;
