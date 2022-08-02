import './sass/styles.scss';

import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsContextProvider from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <SettingsContextProvider>
          <App />
        </SettingsContextProvider>
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </React.StrictMode>
);
