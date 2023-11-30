import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
// import Navbar from '../components/Navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
// import HomePage from './HomePage';
// import Panel from '../components/Panel/Panel';

// This page will determine what to render: login or home page
const MainPage = () => {
  const { userId, setUserId } = useOutletContext();

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

  // const navigate = useNavigate();

  return (
    <Grid container>
      {/* <Navbar
        className="nav-bar"
        key={uuidv4()}
        toggleDashboard={toggleDashboard}
        setToggleDashboard={setToggleDashboard}
      /> */}

      <Outlet />
    </Grid>
  );
};

export default MainPage;
