import React from 'react';
import '../../styles/Tasks.css';

function NewTaskButton({ handleClick }) {
  return (
    <button className="New-task-button" onClick={handleClick}>
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
      Add Task
    </button>
  );
}

export default NewTaskButton;
