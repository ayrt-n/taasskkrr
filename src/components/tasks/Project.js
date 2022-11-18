import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import Task from './Task';
import '../../styles/Tasks.css';

function Project() {
  let { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});

  useEffect(() => {
    setLoading(true);
    UserService.getProjectTasks(projectId).then((data) => {
      console.log(data);
      setProject(data);
      setLoading(false);
    });
  }, [projectId]);

  const updateTask = (updatedTask, section=null) => {
    if (section) {
      console.log('TODO');
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
        }
      );
    }
  };

  return (
    <div className="Tasks">
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {!loading && project.tasks.map((task) => <Task key={task.id} {...task} handleUpdate={updateTask} />)}
      </div>
    </div>
  );
}

export default Project;
