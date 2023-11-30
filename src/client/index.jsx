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
import MainPage from './pages/MainPage.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ClusterView from './pages/ClusterView.jsx';
// import MainPage from './pages/MainPage.jsx';
import { AuthProvider } from './pages/AuthContext.jsx';
import { UserProvider } from './pages/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="main-page" element={<App />}>
              <Route index element={<MainPage />} />
              <Route path="home" element={<HomePage />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="cluster-view" element={<ClusterView />} />
              <Route path="alerts" element={<Alerts />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

// <ThemeProvider theme={dashboardTheme}>
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// </ThemeProvider>
