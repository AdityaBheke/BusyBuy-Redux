import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'; // Importing Redux Provider for state management
import { store } from './redux/store'; // Importing the Redux store

// Creating the root element for React to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the application
root.render(
  <React.StrictMode> 
    {/* Wrapping the application with Redux Provider to make the store accessible */}
    <Provider store={store}>
      <App /> {/* Main App component */}
    </Provider>
  </React.StrictMode>
);
