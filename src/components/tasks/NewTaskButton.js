import React from 'react';
import '../../styles/Tasks.css';

function NewTaskButton({ projectId, sectionId, afterSubmit, openModal }) {
  const emptyTask = {
    title: '',
    description: '',
    section_id: sectionId,
    project_id: projectId
  };

  const openNewTaskModal = () => {
    openModal('newTask', {task: emptyTask, callback: afterSubmit});
  };

  return (
    <div>
      <button className="New-task-button" onClick={openNewTaskModal}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
        Add Task
      </button>
    </div>
  );
}

export default NewTaskButton;
