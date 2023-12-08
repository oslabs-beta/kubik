import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import Header from './components/Header/Header.jsx';

if (typeof global === 'undefined') {
  window.global = window;
}

const App = () => {
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [username, setUsername] = useState('');

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

  // if (!loggedIn) {
  //   return <Navigate href="/" replace />;
  // }

  return (
    <Grid container>
      {/* <Navbar /> */}
      {/* <Header title={title} /> Uncomment if Header is needed */}
      <Outlet context={{}} />
    </Grid>
  );
};

export default App;
