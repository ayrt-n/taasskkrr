import React, { useState } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import TaskService from '../../services/TaskService';
import trashIcon from '../../assets/icons/trash-can.svg';
import '../../styles/Tasks.css';

function DeleteTaskButton({ id, sectionId, handleDelete }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const deleteTask = () => {
    TaskService.destroyTask(id).then((data) => {
      if (!data.error) {
        handleDelete(data, sectionId);
      } else {
        // TODO HANDLE ERROR IN DELETE
      }
    });
  };

  return (
    <div>
      <ConfirmationModal
        header="Confirm Delete"
        message="Are you sure you want to permanently delete this task?"
        buttonText="Delete"
        confirmCallback={deleteTask}
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <button className="Task-icon-button" onClick={() => setModalIsOpen(true)}>
        <img src={trashIcon} alt="" />
      </button>
    </div>
  );
}

export default DeleteTaskButton;
