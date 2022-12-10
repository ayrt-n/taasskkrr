import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import EmailConfirmation from '../EmailConfirmation';

// Mock implementation of confirmEmail method. If provided with 'goodToken'
// it will return a promise which resolves with no error key
jest.mock('../../services/accountServices', () => {
  return ({
    confirmEmail: (token) => {
      if (token === 'goodToken') {
        return new Promise(function (resolve, _reject) {
          resolve({ response: 'success' })
        });
      } else {
        return new Promise(function (resolve, _reject) {
          resolve({ error: { details: 'failure' } })
        });
      }
    }
  });
});

// Mock useNavigate from react-router-dom
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('EmailConfirmation component', () => {
  describe('when successfully confirmed', () => {
    it('navigates to /login with success flash', async () => {
      await render(
        <MemoryRouter initialEntries={['?confirmation_token=goodToken']}>
          <EmailConfirmation />
        </MemoryRouter>
      );

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

  describe('when unable to confirm', () => {
    it('navigates to /login with failure flash', async () => {
      await render(
        <MemoryRouter initialEntries={['?confirmation_token=badToken']}>
          <EmailConfirmation />
        </MemoryRouter>
      );

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
