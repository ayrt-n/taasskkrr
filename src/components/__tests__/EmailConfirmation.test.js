import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import EmailConfirmation from '../EmailConfirmation';
import { confirmEmail } from '../../services/accountService';

// Set up mock for confirmEmail
jest.mock('../../services/accountService', () => ({
  ...jest.requireActual('../../services/accountService'),
  confirmEmail: jest.fn()
}));

// Mock useNavigate from react-router-dom
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('EmailConfirmation component', () => {
  describe('when successfully confirmed', () => {
    it('navigates to /login with success flash', async () => {
      const successfulResponse = { response: 'success' };
      confirmEmail.mockResolvedValue(successfulResponse);

      render(
        <MemoryRouter initialEntries={['?confirmation_token=goodToken']}>
          <EmailConfirmation />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith(
          "/login",
          { "state":
            {
              "body": "Log in and get started!", "message": "Email confirmed!", "type": "success"
            }
          }
        );
      });
    });
  });

  describe('when unable to confirm', () => {
    it('navigates to /login with failure flash', async () => {
      const failedResponse = { error: { details: 'failure' } };
      confirmEmail.mockResolvedValue(failedResponse);

      render(
        <MemoryRouter initialEntries={['?confirmation_token=badToken']}>
          <EmailConfirmation />
        </MemoryRouter>
      );

      await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith(
          "/login",
          { "state":
            {
              "details": "failure", "message": "Unable to confirm email:", "type": "danger"
            }
          }
        );
      });
    });
  });
});
