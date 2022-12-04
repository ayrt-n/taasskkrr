import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import TaskModal from '../TaskModal';

// Set up mocks
jest.mock('../TaskForm', () => () => (
  <div data-testid='task form'></div>
));

jest.mock('../TaskDetails', () => ({ editTask }) => (
  <div data-testid='task details'>
    <button onClick={editTask}>Edit Task</button>
  </div>
));

describe('TaskModal component', () => {
  it('renders task details by default', () => {
    render(<TaskModal />);

    const taskDetails = screen.queryByTestId('task details');
    const taskForm = screen.queryByTestId('task form');

    expect(taskDetails).not.toBe(null);
    expect(taskForm).toBe(null);
  });

  it('changes to task form after clicking edit button', () => {
    render(<TaskModal />);
    
    const editButton = screen.getByRole('button', /edit task/i);
    userEvent.click(editButton);
    const taskDetails = screen.queryByTestId('task details');
    const taskForm = screen.queryByTestId('task form');

    expect(taskDetails).toBe(null);
    expect(taskForm).not.toBe(null);
  });
});
