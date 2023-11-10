// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import 'dotenv/config';

const clientID =import.meta.env.VITE_CLIENT_AUTH_GOOGLE_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
  // </React.StrictMode>
);
