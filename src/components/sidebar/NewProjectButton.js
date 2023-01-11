import React from 'react';

// Button component to open new project modal
function NewProjectButton({ openModal, afterSubmit }) {
  const emptyProject = { title: '' };

  const openNewProjectModal = () => {
    openModal('newProject', {header: 'Add Project', project: emptyProject, callback: afterSubmit})
  };

  return (
    <div className="SidebarItem no-hover">
      <button className="SidebarItem-button" onClick={openNewProjectModal}>
        <svg className="SidebarItem-icon" viewBox="0 0 24 24" style={{width: '1rem', height: '1rem'}}>
          <path fill="currentColor" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
        Add Project
      </button>
    </div>
  );
}

export default NewProjectButton;
