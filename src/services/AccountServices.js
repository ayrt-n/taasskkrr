const API_URL = 'http://localhost:3001/api/v1'

class AccountServices {
  resendConfirmationEmail(email) {
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

  confirmEmail(confirmation_token) {
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

  sendPasswordReset(email) {
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

  resetPassword(password, passwordConfirmation, resetToken) {
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
}

export default new AccountServices();