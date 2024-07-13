import React, { useState, useEffect } from 'react';
import TaskComponent from './TaskComponent';
import './TaskListComponent.css';
import axios from 'axios';

function TaskListComponent({}) {
  const statusCategories = ['draft', 'in progress', 'done'];
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
    }, []); // Пустий масив залежностей означає, що ефект виконується тільки після монтування компонента

  return (
    
    <div className="TLC">
      <div className="task-list" data-testid="task-list">
      {statusCategories.map(status => (
        <div key={status} className="task-collumn">
          <h2>{status}</h2>
          {tasks.filter(task => task.status === status).map(task => (
            <TaskComponent key={task.id} task={task}/>
          ))}
        </div>
          
        ))}
      </div>
    </div>
  );
}

export default TaskListComponent;
