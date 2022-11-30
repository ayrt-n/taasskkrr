import React from 'react';
import closeIcon from '../../assets/icons/close.svg';
import Priority from './Priority';
import Button from '../form/Button';

function TaskDetails({ task, closeModal, editTask }) {
  return (
    <>
      <div className="Modal-header-container">
        <h2>{task.title}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="Modal-content-container">
        <div className="field">
          <p className="label">Description</p>
          <p>{task.description}</p>
        </div>
        <div className="field">
          <p className="label">Priority</p>
          <Priority priorityEnum={task.priority} />
        </div>
        <div className="field">
          <p className="label">Due Date</p>
          <p>{task.due_date || "N/A"}</p>
        </div>
        <Button label="Edit Task" buttonStyles="is-primary" onClick={editTask}/>
      </div>
    </>
  );
}

export default TaskDetails;
