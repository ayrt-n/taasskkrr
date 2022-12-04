import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../Navbar';

describe('Navbar component', () => {
  it('renders register and sign up links when not logged in', () => {
    const currentUserMock = null
    render(
      <Navbar currentUser={currentUserMock} />,
      { wrapper: MemoryRouter }
    );

    const signUpLink = screen.queryByRole('link', { name: /sign up/i });
    const loginLink = screen.queryByRole('link', { name: /login/i });
    const logoutLink = screen.queryByRole('link', { name: /logout/i });

    expect(signUpLink).not.toBe(null);
    expect(loginLink).not.toBe(null);
    expect(logoutLink).toBe(null);
  });

  it('renders logout link when logged in', () => {
    const currentUserMock = true
    render(
      <Navbar currentUser={currentUserMock} />,
      { wrapper: MemoryRouter }
    );

    const signUpLink = screen.queryByRole('link', { name: /sign up/i });
    const loginLink = screen.queryByRole('link', { name: /login/i });
    const logoutLink = screen.queryByRole('link', { name: /logout/i });

    expect(signUpLink).toBe(null);
    expect(loginLink).toBe(null);
    expect(logoutLink).not.toBe(null);
  });

  it('calls logOut function when Logout link clicked', () => {
    const logOutMock = jest.fn();
    const currentUserMock = true
    render(
      <Navbar currentUser={currentUserMock} logOut={logOutMock} />,
      { wrapper: MemoryRouter }
    );

    const logoutLink = screen.getByRole('link', { name: /logout/i });
    userEvent.click(logoutLink);

    expect(logOutMock).toHaveBeenCalledTimes(1);
  });
});
