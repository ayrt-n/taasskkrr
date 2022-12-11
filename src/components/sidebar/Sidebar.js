import React from 'react';
import '../../styles/Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarCollapsableList from './SidebarCollapsableList';
import NewProjectButton from './NewProjectButton';

function Sidebar({ projects, inbox, addProject, openModal, sidebarOpen}) {
  return (
    <div className={`Sidebar ${sidebarOpen ? "open" : ""}`}>
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
