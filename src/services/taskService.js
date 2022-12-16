import authHeader from "./authHeader";
import { config } from './constants';

const API_URL = config.url.API_URL

function toggleTaskComplete(taskId, status) {
  return fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'task': {
        'status': status
      }
    })
  })
  .then(response => {
    return response.json();
  });
}

function destroyTask(taskId) {
  return fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
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

function updateTask(task) {
  return fetch(`${API_URL}/tasks/${task.id}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'task': {
        'title': task.title,
        'description': task.description,
        'priority': task.priority,
        'due_date': task.due_date,
        'status': task.status
      }
    })
  })
  .then(response => {
    return response.json();
  });
}

function createTask(task, projectId, sectionId=null) {
  const addTaskUrl = sectionId ?
                      `${API_URL}/sections/${sectionId}/tasks` :
                      `${API_URL}/projects/${projectId}/tasks`

  return fetch(addTaskUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'task': {
        'title': task.title,
        'description': task.description,
        'priority': task.priority,
        'due_date': task.due_date,
        'status': task.status
      }
    })
  })
  .then(response => {
    return response.json();
  })
}

function updateSection(sectionTitle, sectionId) {
  return fetch(`${API_URL}/sections/${sectionId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'section': {
        'title': sectionTitle
      }
    })
  })
  .then(response => {
    return response.json();
  });
}

function destroySection(sectionId) {
  return fetch(`${API_URL}/sections/${sectionId}`, {
    method: 'DELETE',
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

function createSection(sectionTitle, projectId) {
  return fetch(`${API_URL}/projects/${projectId}/sections`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'section': {
        'title': sectionTitle
      }
    })
  })
  .then(response => {
    return response.json();
  })
}

function updateProject(projectTitle, projectId) {
  return fetch(`${API_URL}/projects/${projectId}`, {
    method: 'PATCH',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'project': {
        'title': projectTitle
      }
    })
  })
  .then(response => {
    return response.json();
  });
}

function destroyProject(projectId) {
  return fetch(`${API_URL}/projects/${projectId}`, {
    method: 'DELETE',
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

function createProject(projectTitle) {
  return fetch(`${API_URL}/projects/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader()
    },
    body: JSON.stringify({
      'project': {
        'title': projectTitle
      }
    })
  })
  .then(response => {
    return response.json();
  })
}

export {
  toggleTaskComplete,
  destroyTask,
  updateTask,
  createTask,
  updateSection,
  destroySection,
  createSection,
  updateProject,
  destroyProject,
  createProject,
};
