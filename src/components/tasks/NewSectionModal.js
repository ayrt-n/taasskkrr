import React from 'react';
import Modal from 'react-modal';
import SectionForm from './SectionForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function NewSectionModal({ section, projectId, isOpen, closeModal, afterSubmit }) {
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
      <SectionForm
        section={section}
        projectId={projectId}
        closeModal={closeModal}
        afterSubmit={afterSubmit}
      />
    </Modal>
  );
}

export default NewSectionModal;
