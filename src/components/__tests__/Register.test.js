import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Register from '../Register';
import { register } from '../../services/authService';

// Mock register method of authService module
jest.mock('../../services/authService', () => ({
  ...jest.requireActual('../../services/authService'),
  register: jest.fn()
}));

// Mock Alert component
jest.mock('../Alert', () => ({ type, message, details }) => (
  <div data-testid="alert-container" className={type}>
    <div data-testid="alert-message">{message}</div>
    <div data-testid="alert-details">{details}</div>
  </div>
));

// Mock useNavigate from react-router-dom
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Register component', () => {
  // Mock window.location.reload
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  describe('form validation', () => {
    it('flags required fields if empty', async () => {
      render(<Register />, { wrapper: MemoryRouter });

      const submit = screen.getByRole('button', { name: /sign up/i });
      userEvent.click(submit);

      const errors = await screen.findAllByTestId('form-error')
      .then((data) => (
        data.map((error) => error.textContent)
      ));

      expect(errors).toEqual(['Required', 'Required', 'Required']);
      expect(register).not.toHaveBeenCalled();
    });

    it('flags validation errors', async () => {
      render(<Register />, { wrapper: MemoryRouter });

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/^password/i);
      const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
      const submit = screen.getByRole('button', { name: /sign up/i });
      
      userEvent.type(emailInput, 'not-an-email');
      userEvent.type(passwordInput, '42');
      userEvent.type(passwordConfirmationInput, 'not 42');
      userEvent.click(submit);

      const errors = await screen.findAllByTestId('form-error')
        .then((data) => (
          data.map((error) => error.textContent)
        ));

      expect(errors).toEqual([
        'Invalid email address',
        'Password must be 6 characters or greater',
        'Password confirmation does not match password'
      ]);
      expect(register).not.toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('redirects to login if submit successful', async () => {
      const successfulResponse = { response: 'success' };
      register.mockResolvedValue(successfulResponse);

      render(<Register />, { wrapper: MemoryRouter });

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/^password/i);
      const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
      const submit = screen.getByRole('button', { name: /sign up/i });
      
      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, '123456');
      userEvent.type(passwordConfirmationInput, '123456');
      userEvent.click(submit);

      await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith(
          '/login',
          { state: {
            type: 'success',
            message: 'Registration complete!',
            body: 'Check your email for instructions on how to confirm your email.'
            }
          }
        )
      });
    });

    it('displays error messages if submit unsuccessful', async () => {
      const errorResponse = { error: { details: 'failed' } };
      register.mockResolvedValue(errorResponse);

      render(<Register />, { wrapper: MemoryRouter });

      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const passwordInput = screen.getByLabelText(/^password/i);
      const passwordConfirmationInput = screen.getByLabelText(/confirm password/i);
      const submit = screen.getByRole('button', { name: /sign up/i });

      userEvent.type(emailInput, 'test@test.com');
      userEvent.type(passwordInput, '123456');
      userEvent.type(passwordConfirmationInput, '123456');
      userEvent.click(submit);

      const errorContainer = await screen.findByTestId('alert-container');
      const errorMessage = await screen.findByTestId('alert-message');
      const errorDetails = await screen.findByTestId('alert-details');

      expect(errorContainer).toHaveClass('danger');
      expect(errorMessage).toHaveTextContent(/sign up failed/i);
      expect(errorDetails).toHaveTextContent(/failed/i);
    });
  });
});