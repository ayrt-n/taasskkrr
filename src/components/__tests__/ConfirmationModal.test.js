import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ConfirmationModal from '../ConfirmationModal';

// Set up mocks
jest.mock('../form/Button', () => ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
));

describe('ConfirmationModal component', () => {
  describe('rendering component', () => {
    it('renders the correct buttons', () => {
      render(<ConfirmationModal buttonText="Test button" />);
      
      const confirmationButton = screen.getByRole('button', { name: /test button/i });
      const closeButton = screen.getByRole('button', { name: /cancel/i });

      expect(confirmationButton).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('handling button clicks', () => {
    const closeModalMock = jest.fn();
    const callbackMock = jest.fn();

    it('confirmation button triggers callback and closeModal', () => {
      render(
        <ConfirmationModal
          buttonText="Confirm"
          confirmCallback={callbackMock}
          closeModal={closeModalMock}
        />
      );

      const confirmationButton = screen.getByRole('button', { name: /confirm/i });
      userEvent.click(confirmationButton);

      expect(callbackMock).toHaveBeenCalledTimes(1);
      expect(closeModalMock).toHaveBeenCalledTimes(1);
    });

    it('calls closeModal when cancel button clicked', () => {
      render(
        <ConfirmationModal
          buttonText="Confirm"
          confirmCallback={callbackMock}
          closeModal={closeModalMock}
        />
      );
  
      const closeButton = screen.getByRole('button', { name: /cancel/i });
      userEvent.click(closeButton);
  
      expect(closeModalMock).toHaveBeenCalled();
    });
  });
});
