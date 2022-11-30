import React from 'react';
import Button from './form/Button';
import closeIcon from '../assets/icons/close.svg';
import '../styles/Modal.css';
import '../styles/Form.css';

function ConfirmationModal({ header, message, buttonText, closeModal, confirmCallback }) {
  const handleConfirmation = () => {
    confirmCallback();
    closeModal();
  }

  return (
    <>
      <div className="Modal-header-container">
        <h2>{header}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div>
        <p className="Modal-message">{message}</p>
        <div className="field is-grouped">
          <Button onClick={handleConfirmation} label={buttonText} buttonStyles="is-danger" />
          <Button onClick={closeModal} label="Cancel" />
        </div>
      </div>
    </>
  );
}

export default ConfirmationModal;
