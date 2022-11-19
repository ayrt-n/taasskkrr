import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import Task from './Task';
import '../../styles/Tasks.css';
import TaskModal from './TaskModal';

function Project() {
  let { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [taskModal, setTaskModal] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false)

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

  const deleteTask = (deletedTask, section=null) => {
    if (section) {
      console.log('TOOD');
    } else {
      setProject(
        {
          ...project,
          tasks: project.tasks.filter((task) => (task.id !== deletedTask.id))
        }
      )
    }
  }

  const openTaskModal = (task) => {
    setTaskModal(task);
    setModalIsOpen(true);
  }

  const closeTaskModal = () => {
    setTaskModal({});
    setModalIsOpen(false);
  }

  return (
    <div className="Tasks">
      <TaskModal task={taskModal} isOpen={modalIsOpen} closeModal={closeTaskModal} updateTask={updateTask} />
      <h1>{project.title}</h1>
      <div className="Tasks-container">
        {!loading && project.tasks.map((task) => <Task key={task.id} {...task} handleUpdate={updateTask} handleDelete={deleteTask} handleClick={openTaskModal} />)}
      </div>
    </div>
  );
}

export default Project;
