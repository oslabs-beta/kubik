// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { dashboardTheme } from '../dashboardTheme.js';
import Authentication from './pages/Authentication/Authentication.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="authentication" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
