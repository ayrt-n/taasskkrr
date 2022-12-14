import React from 'react';
import DropdownMenu from '../DropdownMenu';
import TaskService from '../../services/TaskService';
import eventBus from '../common/EventBus';
import '../../styles/DropdownMenu.css'

function ProjectDropdownMenu({ title, name, projectId, sectionId, openModal, handleUpdate, handleDelete}) {
  const deleteSection = () => {
    TaskService.destroySection(sectionId).then((data) => {
      if (!data.error) {
        handleDelete(data, sectionId);
      } else {
        if (data.error.details[0] === "Signature has expired") {
          eventBus.dispatch('logout');
        }
      }
    });
  };

  const deleteProject = () => {
    TaskService.destroyProject(projectId).then((data) => {
      if (!data.error) {
        handleDelete(data, projectId);
      } else {
        if (data.error.details[0] === "Signature has expired") {
          eventBus.dispatch('logout');
        }
      }
    });
  };

  const openEditModal = () => {
    if (sectionId) {
      openModal('editSection', {header: 'Edit Section', projectId, section: { title, id: sectionId }, callback: handleUpdate})
    } else {
      openModal('editProject', {header: 'Edit Project', project: { title, id: projectId }, callback: handleUpdate})
    }
  };

  const openDeleteModal = () => {
    if (sectionId) {
      openModal('confirmation', {
        header: 'Confirm Delete',
        message: 'Are you sure you want to permanently delete this section?',
        buttonText: 'Delete',
        callback: deleteSection
      });
    } else {
      openModal('confirmation', {
        header: 'Confirm Delete',
        message: 'Are you sure you want to permanently delete this project?',
        buttonText: 'Delete',
        callback: deleteProject
      });
    }
  };

  return (
    <DropdownMenu>
      <li className="Dropdown-item">
        <button onClick={openEditModal}>Edit {name}</button>
      </li>
      <li className="Dropdown-item">
        <button onClick={openDeleteModal}>Delete {name}</button>
      </li>
    </DropdownMenu>
  );
}

export default ProjectDropdownMenu;
