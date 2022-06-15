import './sass/styles.scss';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsContextProvider from './context/SettingsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
);
