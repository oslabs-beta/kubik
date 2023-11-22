// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import GrafanaDashboard from './GrafanaDashboard.jsx';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Header from './components/Header/Header.jsx';
import { useLocation } from 'react-router-dom';

const App = () => {
  // state for titles
  const [title, setTitle] = useState(null);
  const location = useLocation();

  // useEffect to set title of page
  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, ' ');
    setTitle(parsedTitle);
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet />
      <GrafanaDashboard dashboardUid="" />
    </Grid>
  );
};

export default App;
