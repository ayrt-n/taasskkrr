import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import TaskDetails from '../TaskDetails';

// Set up children to mock
jest.mock('../Priority', () => ({ priorityEnum }) => (
  <div>{priorityEnum}</div>
));

jest.mock('../../form/Button', () => ({ onClick }) => (
  <button onClick={onClick}>Edit Task</button>
));

// Set up props
const closeModalMock = jest.fn();
const editTaskMock = jest.fn();
const taskWithDueDate = {
  title: 'Test Task',
  description: 'Test task description',
  priority: 0,
  due_date: 'Some time in the future',
}
const taskNoDueDate = {
  title: 'Test Task',
  description: 'Test task description',
  priority: 0,
  due_date: null,
}

describe('TaskDetail component', () => {
  it('calls closeModal when close modal button clicked', () => {
    render(
      <TaskDetails
        task={taskWithDueDate}
        closeModal={closeModalMock}
        editTask={editTaskMock}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    userEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalled();
  });

  it('calls editTask when edit task button is clicked', () => {
    render(
      <TaskDetails
        task={taskWithDueDate}
        closeModal={closeModalMock}
        editTask={editTaskMock}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit task/i });
    userEvent.click(editButton);

    expect(editTaskMock).toHaveBeenCalled();
  });

  describe('when provided with a due date', () => {
    it('renders correctly', () => {
      const { container } = render(
        <TaskDetails
          task={taskWithDueDate}
          closeModal={closeModalMock}
          editTask={editTaskMock}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('when not provided with a due date', () => {
    it('renders correctly', () => {
      const { container } = render(
        <TaskDetails
          task={taskNoDueDate}
          closeModal={closeModalMock}
          editTask={editTaskMock}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });
});