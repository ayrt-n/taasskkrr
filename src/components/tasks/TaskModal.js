import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function TaskModal({ task, sectionId, closeModal, afterSubmit }) {
  const [editMode, setEditMode] = useState(false);

  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      zIndex: '40'
    },
    content: {
      border: '2px solid var(--bgLayerColor)',
      background: 'var(--bgColor)',
      margin: '0 auto',
      maxHeight: 'min-content',
      maxWidth: '900px'
    }
  };

  return (
    <>
      {editMode ?
        <TaskForm
          task={task}
          sectionId={sectionId}
          closeModal={closeModal}
          afterSubmit={afterSubmit}
        /> :
        <TaskDetails
          task={task}
          closeModal={closeModal}
          editTask={() => { setEditMode(true) }}
        />
      }
    </>
  );
}

export default TaskModal;
