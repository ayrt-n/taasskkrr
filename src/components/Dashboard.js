import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Project from './tasks/Project';
import Today from './tasks/Today';
import Upcoming from './tasks/Upcoming';
import '../styles/Dashboard.css';

function Dashboard({ projects }) {
  return (
    <div className="Dashboard-container">
      <Sidebar projects={projects}/>
      <div className="Dashboard-content">
        <Routes>
          <Route path="/inbox" element={<Project />} />
          <Route path="/today" element={<Today />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
