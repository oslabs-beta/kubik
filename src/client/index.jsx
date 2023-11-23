// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { dashboardTheme } from '../dashboardTheme.js';
import Main from './pages/MainPage/MainPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

{
  /* <ThemeProvider theme={dashboardTheme}>
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route path="home" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
</BrowserRouter>
</ThemeProvider> */
}
