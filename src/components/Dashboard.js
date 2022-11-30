import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Project from './tasks/Project';
import Today from './tasks/Today';
import Upcoming from './tasks/Upcoming';
import UserService from '../services/UserService';
import '../styles/Dashboard.css';

function Dashboard() {
  const [inbox, setInbox] = useState(null);
  const [userProjects, setUserProjects] = useState(null);

  useEffect(() => {
    UserService.getUserProjects().then((userProjects) => {
      setUserProjects(userProjects.filter(project => !project.inbox));
      setInbox(userProjects.filter(project => project.inbox)[0]);
    });
  }, []);

  const addProject = (newProject) => {
    setUserProjects(userProjects.concat(newProject));
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

  return (
    userProjects &&
    (<div className="Dashboard-container">
      <Sidebar projects={userProjects} inbox={inbox} addProject={addProject} />
      <div className="Dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to={`/projects/${inbox.id}`}/>} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route
            path="/projects/:projectId"
            element={
              <Project deleteSidebarProject={deleteProject}
              updateSidebarProject={updateProject} />
            }
          />
        </Routes>
      </div>
    </div>)
  );
}

export default Dashboard;
