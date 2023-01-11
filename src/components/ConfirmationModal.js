import React from 'react';
import Button from './form/Button';
import '../styles/Modal.css';
import '../styles/Form.css';

// Fragment to be used within React Modal component
// Provides users with a modal prompting them if they want to confirm a certain action
// E.g., Are you sure you want to delete this?
// Modal must be provided with a close modal callback to close the modal and 
// confirmation callback which is run if the user accepts the prompt
function ConfirmationModal({ message, buttonText, closeModal, confirmCallback }) {
  const handleConfirmation = () => {
    confirmCallback();
    closeModal();
  }

  return (
    <>
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
