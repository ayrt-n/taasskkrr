import { config } from './constants';

const API_URL = config.url.API_URL

// API request to resend account confirmation email
function resendConfirmationEmail(email) {
  return fetch(`${API_URL}/confirmation`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user': {
        'email': email
      }
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
}

// API request to confirm account/email
function confirmEmail(confirmation_token) {
  return fetch(`${API_URL}/confirmation?confirmation_token=${confirmation_token}`, {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });
}

// API request to send password reset email
function sendPasswordReset(email) {
  return fetch(`${API_URL}/password`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user': {
        'email': email
      }
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });
}

// API request to reset password
function resetPassword(password, passwordConfirmation, resetToken) {
  return fetch(`${API_URL}/password`, {
    method: 'PATCH',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'user': {
        'reset_password_token': resetToken,
        'password': password,
        'password_confirmation': passwordConfirmation
      }
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  });
}

export {
  resendConfirmationEmail,
  confirmEmail,
  sendPasswordReset,
  resetPassword,
};
