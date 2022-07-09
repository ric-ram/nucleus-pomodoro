import './sass/styles.scss';

import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsContextProvider from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const apiID = process.env.REACT_APP_AUTH0_API_ID;


root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={apiID}
      scope="openid profile email"
    >
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
