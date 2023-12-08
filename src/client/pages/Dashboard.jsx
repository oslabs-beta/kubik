import React, { useState, useEffect } from 'react';
import BannerComponent from '../components/Dashboard/Banner';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Dashboard = () => {
  const [nodesArr, setNodesArr] = useState([]);
  const [podsArr, setPodsArr] = useState([]);
  const [svcArr, setSvcArr] = useState([]);
  const [deployArr, setDeployArr] = useState([]);
  const [nodesData, setNodesData] = useState([]);

  const getCluster = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/cluster/get/', {
        credentials: 'include',
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err, 'Cluster POST request unsuccessful');
    }
  };

  const getClusterData = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/view/get', {
        credentials: 'include',
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.log(err, 'Cluster data request unsuccessful');
    }
  };

  useEffect(() => {
    const fetchNodes = async () => {
      const nodes = await getCluster();
      const nodesData = await getClusterData();
      setNodesArr(nodes);
      setNodesData(nodesData);
    };

    fetchNodes();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '80',
      }}
    >
      {/* Header section */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Banner section */}
      <Grid container spacing={0.5} style={{ width: '100%' }}>
        <Grid item xs={3}>
          <BannerComponent
            items={[{ header: 'NODES', value: nodesData.nodes.length || 0 }]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[{ header: 'PODS', value: nodesData.pods.length || 0 }]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[
              { header: 'SERVICES', value: nodesData.services.length || 0 },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[
              {
                header: 'DEPLOYMENTS',
                value: nodesData.deployments.length || 0,
              },
            ]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* First row of iframes */}
        <Grid item xs={3}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701758867566&to=1701845267566&panelId=20"
            width="100%"
            height="175"
          ></iframe>
        </Grid>
        <Grid item xs={3}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761410905&to=1701847810905&panelId=155"
            width="100%"
            height="175"
          ></iframe>
        </Grid>
        <Grid item xs={3}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761470945&to=1701847870945&panelId=16"
            width="100%"
            height="175"
          ></iframe>
        </Grid>
        <Grid item xs={3}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761489956&to=1701847889956&panelId=21"
            width="100%"
            height="175"
          ></iframe>
        </Grid>
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* Second row of iframes */}
        <Grid item xs={6}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?panelId=3"
            width="100%"
            height="300"
          ></iframe>
        </Grid>
        <Grid item xs={6}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701763672641&to=1701850072641&panelId=24"
            width="100%"
            height="300"
          ></iframe>
        </Grid>
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* Third row of iframes */}
        <Grid item xs={6}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761582861&to=1701847982861&panelId=84"
            width="100%"
            height="300"
          ></iframe>
        </Grid>
        <Grid item xs={6}>
          <iframe
            src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761600576&to=1701848000576&panelId=156"
            width="100%"
            height="300"
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
