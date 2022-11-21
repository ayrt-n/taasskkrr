import React from 'react';
import Modal from 'react-modal';
import Button from './form/Button';
import closeIcon from '../assets/icons/close.svg';
import '../styles/Modal.css';
import '../styles/Form.css';

function ConfirmationModal({ header, message, buttonText, isOpen, closeModal, confirmCallback }) {
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
      maxWidth: '300px'
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      style={modalStyles}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <div className="Modal-header-container">
        <h2>{header}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div>
        <p className="Modal-message">{message}</p>
        <div className="field is-grouped">
          <Button onClick={confirmCallback} label={buttonText} danger />
          <Button onClick={closeModal} label="Cancel" />
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
