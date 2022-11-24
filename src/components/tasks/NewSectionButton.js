import React from 'react';
import '../../styles/Tasks.css';

function NewSectionButton({ projectId, openModal, afterSubmit }) {
  const emptySection = {
    title: ''
  }

  const openNewSectionModal = () => {
    openModal('newSection', { section: emptySection, projectId: projectId, callback: afterSubmit });
  };

  return (
    <div>
      <button onClick={openNewSectionModal} className="New-section-button">
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
