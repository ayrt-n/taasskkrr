import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from '../Sidebar';

// Mock child components
jest.mock('../SidebarItem', () => ({ title }) => (
  <div data-testId="item">{title}</div>
));

jest.mock('../SidebarCollapsableList', () => ({ children }) => (
  <div>{ children }</div>
));

jest.mock('../NewProjectButton', () => ({ openModal }) => (
  <button onClick={openModal}>Add Project</button>
));

// Set up props
const inbox = { id: 1 };
const projects = [
  { title: 'Project 1', id: 2 },
  { title: 'Project 2', id: 3 },
];
const addProjectMock = jest.fn();
const openModalMock = jest.fn();


describe('Sidebar component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Sidebar
        projects={projects}
        inbox={inbox}
        addProject={addProjectMock}
        openModal={openModalMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders all sidebar items and projects', () => {
    render(
      <Sidebar
        projects={projects}
        inbox={inbox}
        addProject={addProjectMock}
        openModal={openModalMock}
      />
    );

    const sidebarItems = screen.queryAllByTestId('item')
    expect(sidebarItems.length).toBe(5);
  });
});
