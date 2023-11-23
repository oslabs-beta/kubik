// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
// import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Panel from '../../components/Panel/Panel';

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
  const [clusterFetcher, setClusterFetched] = useState(false);
  const [toggleDashboard, setToggleDashboard] = useState('home');
  const [showClusterEditor, setShowClusterEditor] = useState(false);

  const navigate = useNavigate();

  // declare mainComponent, which will render based off what user clicks
  let mainComponent = <HomePage />;

  return (
    <Grid container>
      <Navbar
        className="nav-bar"
        key={uuidv4()}
        toggleDashboard={toggleDashboard}
        setToggleDashboard={setToggleDashboard}
      />
      <div>{mainComponent}</div>
    </Grid>
  );
};

export default MainPage;
