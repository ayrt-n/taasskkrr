import { config } from './constants';

const API_URL = config.url.API_URL

// Used to ping server to wake up heroku in development
export function pingService() {
  return fetch(`${API_URL}/ping`, {
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
