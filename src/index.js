import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import './index.css'
import App from './App';

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/to-do-list-client" >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
