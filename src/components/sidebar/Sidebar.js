import React, { useState } from 'react';
import '../../styles/Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarCollapsableList from './SidebarCollapsableList';
import ProjectModal from '../tasks/ProjectModal';
import NewProjectButton from './NewProjectButton';

function Sidebar({ projects, inbox, addProject }) {
  const [modal, setModal] = useState({isOpen: false, action: '', data: {}});

  const openModal = (action, data) => {
    setModal(
      {
        isOpen: true,
        action: action,
        data: data
      }
    )
  };

  const closeModal = () => {
    setModal(
      {
        ...modal,
        isOpen: false,
      }
    )
  }

  return (
    <div className="Sidebar">
      <ProjectModal
        action={modal.action}
        data={modal.data}
        isOpen={modal.isOpen}
        closeModal={closeModal}
      />
      <SidebarItem icon="inbox.svg" title="Inbox" action={`/projects/${inbox.id}`} />
      <SidebarItem icon="today.svg" title="Today" action="/today" />
      <SidebarItem icon="upcoming.svg" title="Upcoming" action="/upcoming" />
      <SidebarCollapsableList title="Projects">
        {projects.map((project) => (
          <SidebarItem
            icon="project.svg"
            title={project.title}
            action={`/projects/${project.id}`}
            subItem={true}
            key={project.id}
          />
        ))}
      </SidebarCollapsableList>
      <NewProjectButton openModal={openModal} afterSubmit={addProject} />
    </div>
  );
}

export default Sidebar;
