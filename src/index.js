import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// context
import LoginContextProvider from './context/LoginContextProvider';
import ProjectsContextProvider from './context/ProjectsContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoginContextProvider>
      <ProjectsContextProvider>
        <App />
      </ProjectsContextProvider>
    </LoginContextProvider>
  </React.StrictMode>
);