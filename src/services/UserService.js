import authHeader from "./authHeader";

const API_URL = 'http://localhost:3001/api/v1/tasks/'

class UserService {
  getUserTasks() {
    return fetch(API_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      }
    })
    .then(response => {
      return response.json();
    });
  }
}

export default new UserService();
