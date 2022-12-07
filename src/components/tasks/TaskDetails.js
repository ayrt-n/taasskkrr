import React from 'react';
import Priority from './Priority';
import Button from '../form/Button';

function TaskDetails({ task, editTask }) {
  return (
    <>
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
