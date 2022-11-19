import React from 'react';
import Modal from 'react-modal';
import closeIcon from '../../assets/icons/close.svg';
import Priority from './Priority';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function TaskModal({ title, id, description, priority, due_date, status, isOpen, closeModal }) {
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
    <Modal isOpen={isOpen} style={modalStyles} onRequestClose={closeModal} shouldCloseOnOverlayClick={true}>
      <div className="Modal-header-container">
        <h2>{title}</h2>
        <button className="Close-modal-button" onClick={closeModal}>
          <img src={closeIcon} alt="" />
        </button>
      </div>
      <div className="Modal-content-container">
        <div className="field">
          <p className="label">Description</p>
          <p>{description}</p>
        </div>
        <div className="field">
          <p className="label">Priority</p>
          <Priority priorityEnum={priority} />
        </div>
        <div className="field">
          <p className="label">Due Date</p>
          <p>{due_date}</p>
        </div>
        <div style={{marginBottom: "0"}}  className="control">
          <button className="button">Edit Task</button>
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
