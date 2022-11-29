import React, { useState, useEffect} from 'react';
import '../../styles/Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarCollapsableList from './SidebarCollapsableList';
import UserService from '../../services/UserService';
import ProjectModal from '../tasks/ProjectModal';
import NewProjectButton from './NewProjectButton';

function Sidebar({ userProjects, addProject }) {
  const [modal, setModal] = useState({isOpen: false, action: '', data: {}});
  const inbox = userProjects.filter((project) => (project.inbox))[0];
  const projects = userProjects.filter((project) => (!project.inbox));

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
      <SidebarCollapsableList title="Projects" items={projects} handleAdd={addProject} />
      <NewProjectButton openModal={openModal} afterSubmit={addProject} />
    </div>
  );
}

export default Sidebar;
