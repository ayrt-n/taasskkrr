import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';

jest.mock('../Sidebar/Sidebar', ({ inbox, projects, addProject }) => {
  <div>
    <div data-testId='inbox'>{inbox}</div>
    <div data-testId='projects'>{projects}</div>
    <button onClick={addProject}>Add project</button>
  </div>
});



describe('Dashboard component', () => {
});
