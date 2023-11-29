// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { dashboardTheme } from '../dashboardTheme.js';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alerts from './pages/Alerts.jsx';
import Main from './pages/MainPage.jsx';
import Login from './pages/Login.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

// <ThemeProvider theme={dashboardTheme}>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// </ThemeProvider>
