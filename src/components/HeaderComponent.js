import React from 'react';
import './HeaderComponent.css'
import { Link } from 'react-router-dom';


function HeaderComponent() {
  return (
    <header >
      <h1>Task Manager</h1>
      <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/addTask">Add new task</Link></li>
              <li><Link to="/editTask">Edit tasks</Link></li> 
            </ul>
          </nav>
    </header>
  );
}

export default HeaderComponent;
