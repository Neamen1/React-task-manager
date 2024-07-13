import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TaskComponentWithButtons from './TaskComponentWithButtons';
// import AddTaskButton from './AddTaskButton';
// import TaskFormModal from './TaskFormModal';
import TaskEditForm from './TaskEditForm';
import './EditTaskListComponent.css';

function EditTaskListComponent({ onDelete, onEdit }) {
  const statusCategories = ['draft', 'in progress', 'done'];
  // const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Виконання HTTP-запиту до фейкового API
    axios.get('http://localhost:3001/tasks')
    .then(response => {
      // Оновлення стану tasks з отриманими даними
      setTasks(response.data);
    })
    .catch(error => {
      // Обробка помилки, якщо запит не вдалося виконати
      console.error('Error getting data from API:', error);
    });
    }, []);
  
  const startEditing = (task) => {
    setEditingTask(task);
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const saveTask = (task) => {
    onEdit(task);
    setEditingTask(null);
  };

  return (
    
    <div className="TLC">
      {/* <h1>Tasks <AddTaskButton onClick={() => setModalOpen(true)} /></h1>
      <TaskFormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={onAddTask} /> */}
      
      {editingTask && <TaskEditForm task={editingTask} onSave={saveTask} onCancel={cancelEditing} />}
      
      <div className="task-list">
      {statusCategories.map(status => (
        <div key={status} className="task-collumn">
          <h2>{status}</h2>
          {tasks.filter(task => task.status === status).map(task => (
            
            <TaskComponentWithButtons key={task.id} task={task} onDelete={onDelete} onEdit={startEditing} />
          ))}
            
        </div>
          
        ))}
      </div>

      
    </div>
  );
}

export default EditTaskListComponent;
