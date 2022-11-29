import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Project from './tasks/Project';
import Today from './tasks/Today';
import Upcoming from './tasks/Upcoming';
import UserService from '../services/UserService';
import '../styles/Dashboard.css';

function Dashboard() {
  const [userProjects, setUserProjects] = useState(null);

  useEffect(() => {
    UserService.getUserProjects().then((userProjects) => {
      setUserProjects(userProjects);
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
    <div className="Dashboard-container">
      {userProjects && <Sidebar userProjects={userProjects} addProject={addProject} />}
      <div className="Dashboard-content">
        <Routes>
          <Route path="/inbox" element={<Project />} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route
            path="/projects/:projectId"
            element={
              <Project deleteSidebarProject={deleteProject}
              updateSidebarProject={updateProject} />
            }
          />
          <Route path="/" element={<Today />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
