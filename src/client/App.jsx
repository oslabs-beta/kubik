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
  const [title, setTitle] = useState('Home');
  const [fullname, setFullname] = useState('');

  const getTitleByPathname = (pathname) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const pageName = pathSegments[1] || 'home';

    const pageTitles = {
      home: 'Home',
      dashboard: 'Dashboard',
      'cluster-view': 'Cluster Visualization',
    };

    return pageTitles[pageName.toLowerCase()] || 'Page Not Found';
  };

  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost:3020/', {
        credentials: 'include',
      });

      if (!response.ok) {
        navigate('/');
      }

      const user = await response.json();
      console.log('log user', user);

      if (fullname === '') {
        const userFullName = `${user.firstName} ${user.lastName}`;
        setFullname(userFullName);
      }
      const test = 'welcome' + fullname;
    } catch (error) {
      console.error('Error checking session', error);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    const currentTitle = getTitleByPathname(location.pathname);
    setTitle(currentTitle);
  }, [location]);

  return (
    <Grid container>
      <Navbar />
      <Header title={title} fullname={fullname} />
      <Outlet context={{}} />
    </Grid>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import Navbar from './components/Navbar/Navbar.jsx';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import Grid from '@mui/material/Grid';
// import Header from './components/Header/Header.jsx';

// if (typeof global === 'undefined') {
//   window.global = window;
// }

// const App = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [title, setTitle] = useState('Home');

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

//   useEffect(() => {
//     const parsedTitle = location.pathname
//       .split('/')
//       .filter(Boolean)
//       .map((piece) => piece.charAt(0).toUpperCase() + piece.slice(1))
//       .join(' ');
//     setTitle(parsedTitle || 'Home');
//   }, [location]);

//   return (
//     <Grid container>
//       <Navbar />
//       <Header title={title} />
//       <Outlet context={{}} />
//     </Grid>
//   );
// };

// export default App;
