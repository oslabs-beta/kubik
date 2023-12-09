import React, { useState, useEffect } from 'react';
import BannerComponent from '../components/Dashboard/Banner';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MetricIframe from '../components/Dashboard/MetricIframe';
import metrics from '../components/Dashboard/PanelIds';

const Dashboard = () => {
  const [nodesArr, setNodesArr] = useState([]);
  const [podsArr, setPodsArr] = useState([]);
  const [svcArr, setSvcArr] = useState([]);
  const [deployArr, setDeployArr] = useState([]);
  const [nodesData, setNodesData] = useState({});

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
      console.log('nodesData', nodesData);
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
            items={[{ header: 'NODES', value: nodesData?.nodes?.length || 0 }]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[{ header: 'PODS', value: nodesData?.pods?.length || 0 }]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[
              { header: 'SERVICES', value: nodesData?.services?.length || 0 },
            ]}
          />
        </Grid>
        <Grid item xs={3}>
          <BannerComponent
            items={[
              {
                header: 'DEPLOYMENTS',
                value: nodesData?.deployments?.length || 0,
              },
            ]}
          />
        </Grid>
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* First row of iframes */}
        {metrics.nodeExporter.panelId.slice(0, 4).map((id, index) => (
          <Grid item xs={3} key={index}>
            <MetricIframe
              uid={metrics.nodeExporter.uid}
              panelId={id}
              heightVal={175}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* Second row of iframes */}
        {metrics.nodeExporter.panelId.slice(4, 6).map((id, index) => (
          <Grid item xs={6} key={index}>
            <MetricIframe
              uid={metrics.nodeExporter.uid}
              panelId={id}
              heightVal={300}
            />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={0.5} style={{ width: '100%' }}>
        {/* Third row of iframes */}
        {metrics.nodeExporter.panelId.slice(6).map((id, index) => (
          <Grid item xs={6} key={index}>
            <MetricIframe
              uid={metrics.nodeExporter.uid}
              panelId={id}
              heightVal={300}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
