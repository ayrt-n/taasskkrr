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
  const [projectModalOpen, setProjectModalOpen] = useState(false);

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
      );
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
  };

  const addTask = (newTask, sectionId=null) => {
    if (sectionId) {
      setProject(
        {
          ...project,
          sections: project.sections.map((section) => (
            section.id === sectionId ?
            {
              ...section,
              tasks: section.tasks.concat(newTask)
            } :
            section
          ))
        }
      );
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.concat(newTask)
        }
      );
    }
  };

  const addSection = (newSection) => {
    setProject(
      {
        ...project,
        sections: project.sections.concat({...newSection, tasks: []})
      }
    )
  }

  return (
    loading ?
    null :
    <div className="Tasks">
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {project.tasks.map((task) => (
          <Task key={task.id} task={task} handleUpdate={updateTask} handleDelete={deleteTask} />)
        )}
        <NewTaskButton projectId={projectId} sectionId={null} afterSubmit={addTask} />
      </div>
      {project.sections.map((section) => {
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
            <NewTaskButton sectionId={section.id} projectId={projectId} afterSubmit={addTask} />
          </div>
        );
      })}
      <NewSectionButton projectId={projectId} afterSubmit={addSection} />
    </div>
  );
}

export default Project;
