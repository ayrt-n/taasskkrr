import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Project from './tasks/Project';
import Today from './tasks/Today';
import Upcoming from './tasks/Upcoming';
import DashboardModal from './DashboardModal';
import UserService from '../services/UserService';
import '../styles/Dashboard.css';

function Dashboard({sidebarOpen, closeSidebar}) {
  const [inbox, setInbox] = useState(null);
  const [userProjects, setUserProjects] = useState(null);
  const [modal, setModal] = useState({isOpen: false, action: '', data: {}});
  const dashboardRef = useRef(null);
  const routerNavigate = useNavigate();
  let location = useLocation();

  // Fetch user projects to populate the sidebar on load
  useEffect(() => {
    UserService.getUserProjects().then((userProjects) => {
      setUserProjects(userProjects.filter(project => !project.inbox));
      setInbox(userProjects.filter(project => project.inbox)[0]);
    });
  }, []);

  // Close sidebar on change in location (useful when in mobile)
  useEffect(() => {
    if (sidebarOpen) { closeSidebar(); }
  }, [location]);

  // Close sidebar on click in dashboard content (useful when in mobile)
  useEffect(() => {
    function handleClick(e) {
      if (dashboardRef.current && dashboardRef.current.contains(e.target)) {
        closeSidebar();
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [dashboardRef])

  const addProject = (newProject) => {
    setUserProjects(userProjects.concat(newProject));
    routerNavigate(`/app/projects/${newProject.id}`)
  }

  const updateProject = (updatedProject) => {
    setUserProjects(
      userProjects.map((project) => (project.id === updatedProject.id ? updatedProject : project))
    );
  };

  const deleteProject = (deletedProject) => {
    setUserProjects(
      userProjects.filter((project) => (project.id !== deletedProject.id))
    );
  };

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
    userProjects &&
    (<div className="Dashboard-container">
      <DashboardModal
        action={modal.action}
        data={modal.data}
        isOpen={modal.isOpen}
        closeModal={closeModal}
      />
      <Sidebar
        projects={userProjects}
        inbox={inbox}
        addProject={addProject}
        openModal={openModal}
        sidebarOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />
      <div className="Dashboard-content" ref={dashboardRef}>
        <Routes>
          <Route path="/" element={<Navigate to={`/app/projects/${inbox.id}`}/>} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route
            path="/projects/:projectId"
            element={
              <Project
                deleteSidebarProject={deleteProject}
                updateSidebarProject={updateProject}
                openModal={openModal}
              />
            }
          />
        </Routes>
      </div>
    </div>)
  );
}

export default Dashboard;
