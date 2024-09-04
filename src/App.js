
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTask } from './TodoList/actions';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [error, setError] = useState('');
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (task.trim() === '') {
      setError('*Please enter a task');
      return;
    }
// checking if thee is any duplicate task
    const isDuplicate = tasks.some((t) => t.text.toLowerCase() === task.toLowerCase() && !t.completed);
    if (isDuplicate ) {
      setError('*Task already exists');
      return;
    }
    dispatch(addTask(task));
    setTask('');
    setError('');
  };
  const handleCompleteTask = (index) => {
    dispatch(toggleTask(index));
  };

  const handleDeleteTask = (index) => {
    dispatch(deleteTask(index));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      <ul>
        { tasks.length === 0 ? (
          <p className="empty-message">Your task list is empty. Time to add your first task!</p>
        ) : 
        tasks.map((t, index) => (
          <li key={index} className={t.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={t.completed}
              onClick={() => handleCompleteTask(index)}
            />
            <span onClick={() => handleCompleteTask(index)}>
              {t.text}
            </span>
            <button className='delete' onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
