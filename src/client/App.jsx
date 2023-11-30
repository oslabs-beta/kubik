// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
// import GrafanaDashboard from './GrafanaDashboard.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import Grid from '@mui/material/Grid';
// import Header from './components/Header/Header.jsx';
// import { useLocation } from 'react-router-dom';
// import { DndProvider } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import MainPage from './pages/MainPage';
import { useAuth } from './pages/AuthContext.jsx';
import { useUser } from './pages/UserContext.jsx';

if (typeof global === 'undefined') {
  window.global = window;
}

const App = () => {
  // const navigate = useNavigate();
  // const [userId, setUserId] = useState('');
  // const grafanaDashboardUrl =
  //   'http://localhost:3000/d/rYdddlPWk/node-exporter-full?orgId=1';

  const { isLoggedIn } = useAuth();
  const { userId, setUserId } = useUser();

  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/" replace />;
  }

  return (
    <Grid container>
      <Navbar />
      {/* <Header title={title} /> */}
      <Outlet context={{ userId, setUserId }} />
    </Grid>
  );
};

export default App;

// {
/* <DndProvider backend={HTML5Backend}>
<Routes>
  <Route
    path="/"
    element={<MainPage userId={userId} setUserId={setUserId} />}
  />
  <Route path="/mainPage"></Route>
  <Route
    path="/dashboard"
    element={
      <GrafanaDashboard grafanaDashboardUrl={grafanaDashboardUrl} />
    }
  />
</Routes>
</DndProvider> */
// }

// state to pass cluster info to dashboard
// const [clusterInfo, setClusterInfo] = useState([]);

// state for titles
// const [title, setTitle] = useState(null);
// const location = useLocation();

// useEffect to set title of page
// useEffect(() => {
//   const parsedTitle = location.pathname.replace(/\W/g, ' ');
//   setTitle(parsedTitle);
// }, [location]);
