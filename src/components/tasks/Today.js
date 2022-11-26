import React, { useState, useEffect } from 'react';
import UserService from '../../services/UserService';
import Task from './Task';
import SectionHeader from './SectionHeader';
import '../../styles/Tasks.css';

function Today() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    UserService.getTodayTasks().then((userTasks) => {
      setTasks(userTasks.tasks);
    });
  }, []);

  return (
    <div className="Tasks">
      <div className="Tasks-container">
        <SectionHeader
          title="Today"
          headingLevel="h1"
          inbox={true}
        />
        {tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Today;
