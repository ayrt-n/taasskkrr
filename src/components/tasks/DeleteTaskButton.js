import React from 'react';
import TaskService from '../../services/TaskService';
import trashIcon from '../../assets/icons/trash-can.svg';
import '../../styles/Tasks.css';

function DeleteTaskButton({ id, handleDelete }) {
  const handleClick = () => {
    TaskService.destroyTask(id).then((data) => {
      if (!data.error) {
        handleDelete(data);
      } else {
        // TODO HANDLE ERROR IN DELETE
      }
    });
  };

  return (
    <button className="Task-icon-button" onClick={handleClick}>
      <img src={trashIcon} alt="" />
    </button>
  );
}

export default DeleteTaskButton;
