import React from 'react';
import TaskCheckbox from './TaskCheckbox';
import DeleteTaskButton from './DeleteTaskButton';
import '../../styles/Tasks.css';

function Task({ title, id, description, priority, due_date, status, sectionId, handleUpdate, handleDelete, handleClick }) {
  return (
    <div className="Task">
      <div className="Task-left">
        <TaskCheckbox id={id} sectionId={sectionId} status={status} handleUpdate={handleUpdate} />
      </div>
      <div className="Task-main" onClick={() => handleClick({title, id, description, priority, due_date, status}, sectionId)}>
        <div className="Task-title">{title}</div>
        <div className="Task-subtitle">{due_date}</div>
      </div>
      <div className="Task-right">
        <DeleteTaskButton id={id} sectionId={sectionId} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Task;
