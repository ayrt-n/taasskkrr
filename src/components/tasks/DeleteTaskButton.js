import React from 'react';
import { destroyTask } from '../../services/taskService';
import trashIcon from '../../assets/icons/trash-can.svg';
import eventBus from '../common/EventBus';
import '../../styles/Tasks.css';

function DeleteTaskButton({ id, openModal, handleDelete }) {
  const deleteTask = () => {
    destroyTask(id).then((data) => {
      if (!data.error) {
        handleDelete(data);
      } else {
        if (data.error.details === "Signature has expired") {
          eventBus.dispatch('logout');
        }
      }
    });
  };

  const openDeleteModal = () => {
    openModal('confirmation', {
      header: 'Confirm Delete',
      message: 'Are you sure you want to permanently delete this task?',
      buttonText: 'Delete',
      callback: deleteTask
    });
  };

  return (
    <div>
      <button className="Task-icon-button" onClick={openDeleteModal}>
        <img src={trashIcon} alt="" />
      </button>
    </div>
  );
}

export default DeleteTaskButton;
