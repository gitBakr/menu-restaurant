import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// Import i18n config
import './i18n/config';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
