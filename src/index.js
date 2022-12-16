import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import './index.css'
import App from './App';

Modal.setAppElement('#root');
const root = ReactDOM.createRoot(document.getElementById('root'));

// Given how Github pages impacts production url, set router basename based on environment
const browserRouterBase = process.env.NODE_ENV === 'development' ? '' : '/to-do-list-client';

root.render(
  <React.StrictMode>
    <BrowserRouter basename={browserRouterBase} >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
