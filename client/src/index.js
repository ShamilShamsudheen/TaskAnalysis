import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import DndContextProvider from './DndProvider';

// Replace with your actual Google Client ID
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <DndContextProvider>
        <App />
      </DndContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();
