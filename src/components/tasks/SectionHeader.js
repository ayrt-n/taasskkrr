import React from 'react';
import DropdownMenu from '../DropdownMenu';
import '../../styles/DropdownMenu.css'


function SectionHeader({ title, headingLevel, name, projectId, sectionId, openModal, handleEdit, handleDelete }) {
  const Title = headingLevel;

  const openEditModal = () => {
    if (sectionId) {
      openModal('editSection', {projectId, section: { title, id: sectionId }, callback: handleEdit})
    } else {
      openModal('editProject', {project: { title, id: projectId }, callback: handleEdit})
    }
  };

  const openDeleteModal = () => {
    
  };

  return (
    <div className="Section-header">
      <Title>{title}</Title>
      <DropdownMenu>
        <li className="Dropdown-item">
          <button onClick={openEditModal}>Edit {name}</button>
        </li>
        <li className="Dropdown-item">
          <button onClick={openDeleteModal}>Delete {name}</button>
        </li>
      </DropdownMenu>
    </div>
  );
}

export default SectionHeader;
