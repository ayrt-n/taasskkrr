import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import Task from './Task';
import format from 'date-fns/format';
import '../../styles/Tasks.css';

function Today({ openModal }) {
  const [tasks, setTasks] = useState([]);

  // Fetch users tasks. Returns userTasks in format { tasks: [{}, {}, {}...] }
  useEffect(() => {
    document.title = "Today"
    UserService.getTodayTasks().then((userTasks) => {
      setTasks(userTasks.tasks);
    });
  }, []);

  const updateTask = (updatedTask) => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    // If updatedTask date changed from currentDate, remove it from the list
    // Otherwise, update the list with the updated task
    if (updatedTask.due_date !== currentDate) {
      deleteTask(updatedTask);
    } else {
      setTasks((prevTasks) => (prevTasks.map((task) => {
        return task.id === updatedTask.id ? updatedTask : task;
      })));
    }
  };

  const deleteTask = (deletedTask) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== deletedTask.id));
  };

  return (
    <div className="Tasks">
      <div className="Tasks-container">
        <div className="Section-header">
          <h1>Today</h1>
        </div>
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              openModal={openModal}
              handleUpdate={updateTask}
              handleDelete={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Today;
