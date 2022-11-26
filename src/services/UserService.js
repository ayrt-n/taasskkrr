import authHeader from "./authHeader";

const API_URL = 'http://localhost:3001/api/v1'

class UserService {
  getUserProjects() {
    return fetch(`${API_URL}/projects`, {
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

  getProjectTasks(projectId) {
    return fetch(`${API_URL}/projects/${projectId}`, {
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

  getUserTasks() {
    return fetch(`${API_URL}/tasks`, {
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

  getUpcomingTasks() {
    return fetch(`${API_URL}/tasks?upcoming=true`, {
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
