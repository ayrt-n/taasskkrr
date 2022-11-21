import React, { useState } from 'react';
import Modal from 'react-modal';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function TaskModal({ task, sectionId, isOpen, closeModal, handleUpdate }) {
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
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      onAfterClose={() => { setEditMode(false) }}
    >
      {editMode ?
        <TaskForm
          task={task}
          sectionId={sectionId}
          closeModal={closeModal}
          afterSubmit={handleUpdate}
          switchToEditMode={() => { setEditMode(false) }}
        /> :
        <TaskDetails
          task={task}
          closeModal={closeModal}
          editTask={() => { setEditMode(true) }}
        />
      }
    </Modal>
  );
}

export default TaskModal;
