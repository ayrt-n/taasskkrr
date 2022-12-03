import React from 'react';
import Modal from 'react-modal';
import '../styles/Modal.css';
import '../styles/Form.css';
import TaskModal from './tasks/TaskModal';
import TaskForm from './tasks/TaskForm';
import ConfirmationModal from './ConfirmationModal';
import SectionForm from './tasks/SectionForm';
import ProjectForm from './tasks/ProjectForm';

function DashboardModal({ action, data, isOpen, closeModal }) {
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
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newTask' ?
        <TaskForm
          task={data.task}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'newSection' || action === 'editSection' ?
        <SectionForm
          section={data.section}
          projectId={data.projectId}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'editProject' || action === 'newProject' ?
        <ProjectForm
          project={data.project}
          closeModal={closeModal}
          afterSubmit={data.callback}
        /> :
        action === 'confirmation' ?
        <ConfirmationModal
          header={data.header}
          message={data.message}
          buttonText={data.buttonText}
          confirmCallback={data.callback}
          closeModal={closeModal}
        /> :
        null
      }
    </Modal>
  );
}

export default DashboardModal;
