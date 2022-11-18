import React from 'react';
import TaskCheckbox from './TaskCheckbox';
import '../../styles/Tasks.css';

function Task({ title, id, description, priority, due_date, status, handleUpdate }) {
  return (
    <div className="Task">
      <div className="Task-left">
        <TaskCheckbox id={id} status={status} handleUpdate={handleUpdate} />
      </div>
      <div className="Task-main">
        <div>{title}</div>
        <div>{due_date}</div>
      </div>
      <div className="Task-right">
        <button>-</button>
      </div>
    </div>
  );
}

export default Task;
