import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

if (typeof global === 'undefined') {
  window.global = window;
}

const App = () => {
  const navigate = useNavigate();

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:3020/', {
        credentials: 'include',
      });

      if (!response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking session', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <Grid container>
      <Navbar />
      {/* <Header title={title} /> Uncomment if Header is needed */}
      <Outlet context={{}} />
    </Grid>
  );
};

export default App;
