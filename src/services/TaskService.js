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
}

export default new TaskService();
