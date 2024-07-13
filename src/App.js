import React, { useState, useEffect } from 'react';
import HeaderComponent from './components/HeaderComponent';
import TaskListComponent from './components/TaskListComponent';
import EditTaskListComponent from './components/EditTaskListComponent';
import NotFound from './components/NotFound';
import TaskFormModal from './components/TaskFormModal';
import FooterComponent from './components/FooterComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import './App.css';


function App() {
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


  const handleAddTask = (task) => {
    var newId = Math.max(...tasks.map(t => t.id)) + 1 ;
    newId = newId>0?newId:0;
    const newTasks = { ...task, id: newId};
    setTasks([...tasks, newTasks]);
    
    axios.post(`http://localhost:3001/tasks`, task)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      // Обробка помилки, якщо запит не вдалося виконати
      console.error('Error posting data to API:', error);
    });

  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    axios.delete(`http://localhost:3001/tasks/${id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      console.error('Error deleting data with id:', id,'error:', error);
    });
  };

  const handleEditTask = (updatedTask) => {
    const newTasks = tasks.map(task => {
      if (task.id === updatedTask.id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(newTasks);
    axios.put(`http://localhost:3001/tasks/${updatedTask.id}`, updatedTask)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
    .catch(error => {
      // Обробка помилки, якщо запит не вдалося виконати
      console.error('Error posting data to API:', error);
    });
  };

  return (
    

    <div className="app">
      <BrowserRouter>
        <div>
          {/* Заголовок та навігаційні посилання */}
          <HeaderComponent/>
          
          {/* Роутинг */}
          <Routes>
            <Route path="/" element={<TaskListComponent />} />
            <Route path="/addTask" element={<TaskFormModal onSubmit={handleAddTask}/>} />
            <Route path="/editTask" element={<EditTaskListComponent tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask}  />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FooterComponent/>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
