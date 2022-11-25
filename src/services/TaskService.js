import authHeader from "./authHeader";

const API_URL = 'http://localhost:3001/api/v1'

class TaskService {
  toggleTaskComplete(taskId, status) {
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

  destroyTask(taskId) {
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

  updateTask(task) {
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

  createTask(task, projectId, sectionId=null) {
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

  updateSection(sectionTitle, sectionId) {
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

  deleteSection(sectionId) {
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

  createSection(sectionTitle, projectId) {
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

  updateProject(projectTitle, projectId) {
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

  deleteProject(projectId) {
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
  
  createProject(projectTitle) {
    return fetch(`${API_URL}/projects/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader()
      },
      body: JSON.stringify({
        'section': {
          'title': projectTitle
        }
      })
    })
    .then(response => {
      return response.json();
    })
  }
}

export default new TaskService();
