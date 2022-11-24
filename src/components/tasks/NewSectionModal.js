import React from 'react';
import SectionForm from './SectionForm';
import '../../styles/Modal.css';
import '../../styles/Form.css';

function NewSectionModal({ section, projectId, closeModal, afterSubmit }) {
  return (
    <>
      <SectionForm
        section={section}
        projectId={projectId}
        closeModal={closeModal}
        afterSubmit={afterSubmit}
      />
    </>
  );
}

export default NewSectionModal;
