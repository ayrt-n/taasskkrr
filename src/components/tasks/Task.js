import React from 'react';
import TaskCheckbox from './TaskCheckbox';
import DeleteTaskButton from './DeleteTaskButton';
import '../../styles/Tasks.css';

function Task({ title, id, description, priority, due_date, status, handleUpdate, handleDelete }) {
  return (
    <div className="Task">
      <div className="Task-left">
        <TaskCheckbox id={id} status={status} handleUpdate={handleUpdate} />
      </div>
      <div className="Task-main">
        <div className="Task-title">{title}</div>
        <div className="Task-subtitle">{due_date}</div>
      </div>
      <div className="Task-right">
        <DeleteTaskButton id={id} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Task;
