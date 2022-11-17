import React, { useState, useEffect} from 'react';
import '../../styles/Sidebar.css'
import SidebarItem from './SidebarItem'
import SidebarCollapsableList from './SidebarCollapsableList';
import UserService from '../../services/UserService';

function Sidebar() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    UserService.getUserProjects().then((userProjects) => {
      setProjects(userProjects)
    });
  }, []);

  return (
    <div className="Sidebar">
      <SidebarItem icon="inbox.svg" title="Inbox" action="/inbox" />
      <SidebarItem icon="today.svg" title="Today" action="/today" />
      <SidebarItem icon="upcoming.svg" title="Upcoming" action="/upcoming" />
      <SidebarCollapsableList title="Projects" items={projects} />
    </div>
  );
}

export default Sidebar;
