import authHeader from "./authHeader";
import { config } from './constants';

const API_URL = config.url.API_URL

function getUserProjects() {
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

function getProjectTasks(projectId) {
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

function getUserTasks() {
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

function getUpcomingTasks() {
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

function getTodayTasks() {
  return fetch(`${API_URL}/tasks?today=true`, {
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

export {
  getUserProjects,
  getProjectTasks,
  getUserTasks,
  getUpcomingTasks,
  getTodayTasks,
}
