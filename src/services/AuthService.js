import parseJwt from "./parseJwt";

const API_URL = 'http://localhost:3001/api/v1'

class AuthService {
  login(email, password) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'user': {
          'email': email, 
          'password': password
        }
      })
    })
    .then(response => {
      // If Response includes Authorization token, add to localStorage
      if (response.headers.get('authorization')) {
        const jsonPayload = parseJwt(response.headers.get('authorization'));

        localStorage.setItem(
          'user',
          JSON.stringify({
            authorization: response.headers.get('authorization'),
            user_id: jsonPayload.id,
          })
        );
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(email, password, passwordConfirmation) {
    return fetch(`${API_URL}/signup`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'user': {
          'email': email,
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

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();