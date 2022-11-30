import React from 'react';
import TaskService from '../../services/TaskService';
import trashIcon from '../../assets/icons/trash-can.svg';
import '../../styles/Tasks.css';

function DeleteTaskButton({ id, sectionId, openModal, handleDelete }) {
  const deleteTask = () => {
    TaskService.destroyTask(id).then((data) => {
      if (!data.error) {
        handleDelete(data, sectionId);
      } else {
        // TODO HANDLE ERROR IN DELETE
      }
    });
  };

  const openDeleteModal = () => {
    openModal('deleteTask', {
      header: "Confirm Delete",
      message: "Are you sure you want to permanently delete this task?",
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
