import React, { useState } from 'react';
import NewTaskModal from './NewTaskModal';
import '../../styles/Tasks.css';

function NewTaskButton({ projectId, sectionId, afterSubmit }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <NewTaskModal
        task={{}}
        projectId={projectId}
        sectionId={sectionId}
        afterSubmit={afterSubmit}
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <button className="New-task-button" onClick={() => setModalIsOpen(true)}>
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
        Add Task
      </button>
    </div>
  );
}

export default NewTaskButton;
