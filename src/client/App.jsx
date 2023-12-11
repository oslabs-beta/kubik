import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Header from './components/Header/Header.jsx';

if (typeof global === 'undefined') {
  window.global = window;
}

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('Home'); // Initialize title state

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

  useEffect(() => {
    // Update title based on pathname
    const parsedTitle = location.pathname
      .split('/')
      .filter(Boolean)
      .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
      .join(' ');
    setTitle(parsedTitle || 'Home'); // Set title, default to 'Home'
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} />
      <Outlet context={{}} />
    </Grid>
  );
};

export default App;

// import React, { useEffect } from 'react';
// import Navbar from './components/Navbar/Navbar.jsx';
// import { Outlet, useNavigate } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Header from './components/Header/Header.jsx';

// if (typeof global === 'undefined') {
//   window.global = window;
// }

// const App = () => {
//   const navigate = useNavigate();
//   // const [loggedIn, setLoggedIn] = useState(false);
//   // const [username, setUsername] = useState('');

//   const checkSession = async () => {
//     try {
//       const response = await fetch('http://localhost:3020/', {
//         credentials: 'include',
//       });

//       if (!response.ok) {
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Error checking session', error);
//     }
//   };

//   useEffect(() => {
//     checkSession();
//   }, []);

//   // if (!loggedIn) {
//   //   return <Navigate href="/" replace />;
//   // }

//   return (
//     <Grid container>
//       <Navbar />
//       <Header title={title} />
//       <Outlet context={{}} />
//     </Grid>
//   );
// };

// export default App;
