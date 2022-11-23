import React, { useState } from 'react';
import '../../styles/Tasks.css';
import NewSectionModal from './NewSectionModal';

function NewSectionButton({ projectId, afterSubmit }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <NewSectionModal
        section={{title: ''}}
        projectId={projectId}
        afterSubmit={afterSubmit}
        closeModal={() => setModalIsOpen(false)}
        isOpen={modalIsOpen}
      />
      <button onClick={() => setModalIsOpen(true)} className="New-section-button">
        <p>
          <span>
            Add Section
          </span>
        </p>
      </button>
    </div>
  );
}

export default NewSectionButton;
