import React from 'react';
import Modal from 'react-modal';
import '../../styles/Modal.css';
import '../../styles/Form.css';
import TaskModal from './TaskModal';
import NewSectionModal from './NewSectionModal';
import TaskForm from './TaskForm';
import ConfirmationModal from '../ConfirmationModal';

function ProjectModal({ action, data, isOpen, closeModal }) {
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
    >
      {action === 'viewTask' ?
        <TaskModal
          task={data.task}
          sectionId={data.sectionId}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newSection' ?
        <NewSectionModal
          section={data.section}
          projectId={data.projectId}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newTask' ?
        <TaskForm
          task={data.task}
          projectId={data.projectId}
          sectionId={data.sectionId}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'deleteTask' ?
        <ConfirmationModal
          header="Confirm Delete"
          message="Are you sure you want to permanently delete this task?"
          buttonText="Delete"
          confirmCallback={data.callback}
          closeModal={closeModal}
        /> :
        null
      }
    </Modal>
  );
}

export default ProjectModal;
