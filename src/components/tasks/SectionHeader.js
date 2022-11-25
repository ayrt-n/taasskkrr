import React from 'react';
import DropdownMenu from '../DropdownMenu';
import TaskService from '../../services/TaskService';
import '../../styles/DropdownMenu.css'


function SectionHeader({ title, headingLevel, name, projectId, sectionId, openModal, handleUpdate, handleDelete }) {
  const Title = headingLevel;

  const deleteSection = () => {
    TaskService.destroySection(sectionId).then((data) => {
      if (!data.error) {
        handleDelete(data, sectionId);
      } else {
        // TODO HANDLE ERROR IN DELETE
      }
    });
  };

  const openEditModal = () => {
    if (sectionId) {
      openModal('editSection', {projectId, section: { title, id: sectionId }, callback: handleUpdate})
    } else {
      openModal('editProject', {project: { title, id: projectId }, callback: handleUpdate})
    }
  };

  const openDeleteModal = () => {
    if (sectionId) {
      openModal('deleteSection', {callback: deleteSection})
    } else {
      openModal('deleteProject')
    }
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
