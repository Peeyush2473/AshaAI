import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import the global stylesheet to apply styles across the entire application.
// This is the single source of truth for all our CSS.
import './assets/styles.css';

// Find the root DOM element from index.html where our app will be mounted.
const rootElement = document.getElementById('root');

// Create a React root and render the main App component inside it.
// React.StrictMode is a wrapper that helps with highlighting potential problems in an application.
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

