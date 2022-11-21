import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import Task from './Task';
import TaskModal from './TaskModal';
import NewSectionButton from './NewSectionButton';
import NewTaskButton from './NewTaskButton';
import '../../styles/Tasks.css';

function Project() {
  let { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [taskModal, setTaskModal] = useState({});
  const [sectionModal, setSectionModal] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)

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
    console.log(sectionId)
    console.log(deletedTask)
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

  const openTaskModal = (task, sectionId) => {
    setTaskModal(task);
    setSectionModal(sectionId);
    setModalIsOpen(true);
  }

  const closeTaskModal = () => {
    setTaskModal({});
    setSectionModal(null);
    setModalIsOpen(false);
  }

  return (
    <div className="Tasks">
      <TaskModal task={taskModal} sectionId={sectionModal} isOpen={modalIsOpen} closeModal={closeTaskModal} updateTask={updateTask} />
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {!loading && project.tasks.map((task) => <Task key={task.id} {...task} handleUpdate={updateTask} handleDelete={deleteTask} handleClick={openTaskModal} />)}
        <NewTaskButton />
        <NewSectionButton />
      </div>
      {!loading && project.sections.map((section) => {
        return(
          <div className="Tasks-container" key={section.id}>
            <h2>{section.title}</h2>
            {section.tasks.map((task) => <Task key={task.id} {...task} sectionId={section.id} handleUpdate={updateTask} handleDelete={deleteTask} handleClick={openTaskModal} />)}
            <NewTaskButton />
            <NewSectionButton />
          </div>
        );
      })}
    </div>
  );
}

export default Project;
