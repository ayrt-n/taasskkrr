import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import Task from './Task';
import NewSectionButton from './NewSectionButton';
import NewTaskButton from './NewTaskButton';
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

  const updateTask = (updatedTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
            } :
            section
          ))
        }
      )
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.map((task) => (updatedTask.id === task.id ? updatedTask : task))
        }
      );
    }
  };

  const deleteTask = (deletedTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.filter((task) => (task.id !== deletedTask.id))
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.filter((task) => (task.id !== deletedTask.id))
        }
      );
    }
  }

  return (
    <div className="Tasks">
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {!loading && project.tasks.map((task) => (
          <Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} />)
        )}
        <NewTaskButton />
        <NewSectionButton />
      </div>
      {!loading && project.sections.map((section) => {
        return(
          <div className="Tasks-container" key={section.id}>
            <h2>{section.title}</h2>
            {section.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                sectionId={section.id}
                handleUpdate={updateTask}
                handleDelete={deleteTask}
              />)
            )}
            <NewTaskButton />
            <NewSectionButton />
          </div>
        );
      })}
    </div>
  );
}

export default Project;
