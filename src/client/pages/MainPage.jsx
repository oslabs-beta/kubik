// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
// import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
// import Panel from '../components/Panel/Panel';

// This page will determine what to render: login or home page
const MainPage = ({ userId, setUserId }) => {
  // Declaring default values for dashboard
  const defaultDashboard = {
    apiServer: {
      dashboardUIDKey: '',
      grafanaLinkDText: '',
    },
    kubeStateMetrics: {
      dashboardUIDKey: '',
      grafanaLinkDText: '',
    },
    kubePrometheus: {
      dashboardUIDKey: '',
      grafanaLinkDText: '',
    },
    nodeExporter: {
      dashboardUIDKey: '',
      grafanaLinkDText: '',
    },
  };

  // Declare defaultCluster values
  const defaultCluster = {
    userId: userId,
    clusterName: '',
    url: '',
    dashboards: defaultDashboard,
  };

  // Declare states
  const [cluster, setCluster] = useState([]);
  const [currCluster, setCurrCluster] = useState(defaultCluster);
  // const [clusterFetcher, setClusterFetched] = useState(false);
  // const [toggleDashboard, setToggleDashboard] = useState('home');
  const [showClusterEditor, setShowClusterEditor] = useState(false);

  const navigate = useNavigate();

  // declare mainComponent that will render 'HomePage' and clusterEditor
  let mainComponent = (
    <HomePage
      userId={userId}
      cluster={cluster}
      setCluster={setCluster}
      showClusterEditor={showClusterEditor}
    />
  );

  // // Conditionals for what to render: cluster or dashboard
  // if (toggleDashboard === 'home') {
  //   mainComponent = (
  //     <HomePage
  //       key={uuidv4()}
  //       userId={userId}
  //       cluster={cluster}
  //       setCluster={setCluster}
  //       showClusterEditor={showClusterEditor}
  //       setShowClusterEditor={setShowClusterEditor}
  //     />
  //   );
  // } else {
  //   mainComponent = (
  //     <Dashboard
  //       key={uuidv4()}
  //       userId={userId}
  //       cluster={cluster}
  //       currCluster={currCluster}
  //       toggleDashboard={toggleDashboard}
  //       setToggleDashboard={setToggleDashboard}
  //     />
  //   );
  // }

  return (
    <Grid container>
      <Navbar
        className="nav-bar"
        key={uuidv4()}
        // toggleDashboard={toggleDashboard}
        // setToggleDashboard={setToggleDashboard}
      />
      <Outlet />
    </Grid>
  );
};
//  {/* <div>{mainComponent}</div> */}
export default MainPage;
