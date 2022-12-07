import React from 'react';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import NewProjectButton from '../NewProjectButton';

// Set up props
const openModalMock = jest.fn();
const afterSubmitMock = jest.fn();

describe('NewProjectButton component', () => {
  it('renders new project button correctly', () => {
    const { container } = render(
      <NewProjectButton
        openModal={openModalMock}
        afterSubmit={afterSubmitMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('calls openModal with correct arguments when clicked', () => {
    render(<NewProjectButton openModal={openModalMock} afterSubmit={afterSubmitMock} />);

    const newProjectButton = screen.getByRole('button', {name: /Add Project/i});
    userEvent.click(newProjectButton);

    expect(openModalMock).toHaveBeenCalledTimes(1);
    expect(openModalMock).toHaveBeenCalledWith(
      'newProject',
      {
        header: 'Add Project',
        project: { title: '' },
        callback: afterSubmitMock
      }
    );
  });
});