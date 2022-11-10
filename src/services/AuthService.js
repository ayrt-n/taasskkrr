const API_URL = 'http://localhost:3001/api/v1'

class AuthService {
  login(email, password) {
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: { email, password }
    })
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);

      return data
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
      body: {
        email,
        password,
        passwordConfirmation
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();