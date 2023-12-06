import React, { useState, useEffect } from 'react';
import BannerComponent from '../components/Dashboard/Banner';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const [nodesArr, setNodesArr] = useState([]);
  // Add similar state variables for pods, services, and deployments if needed
  const [podsArr, setPodsArr] = useState([]);
  const [svcArr, setSvcArr] = useState([]);
  const [deployArr, setDeployArr] = useState([]);

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

  useEffect(() => {
    const fetchNodes = async () => {
      const nodes = await getCluster();
      setNodesArr(nodes);
    };

    fetchNodes();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-between',
        alignItems: 'center',
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
      <BannerComponent
        items={[
          { header: 'Nodes', value: nodesArr.length },
          { header: 'Pods', value: podsArr.length },
          { header: 'Services', value: svcArr.length },
          { header: 'Deployments', value: deployArr.length },
        ]}
      />

      {/* First row of iframes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          // width: '90%',
        }}
      >
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701758867566&to=1701845267566&panelId=20"
          width="385"
          height="175"
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761410905&to=1701847810905&panelId=155"
          width="385"
          height="175"
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761470945&to=1701847870945&panelId=16"
          width="385"
          height="175"
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761489956&to=1701847889956&panelId=21"
          width="385"
          height="175"
        ></iframe>
      </div>

      {/* Second row of iframes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701763654014&to=1701850054014&panelId=3"
          width="815"
          height="300"
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701763672641&to=1701850072641&panelId=24"
          width="815"
          height="300"
        ></iframe>
      </div>

      {/* Third row of iframes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761582861&to=1701847982861&panelId=84"
          width="815"
          height="300"
        ></iframe>
        <iframe
          src="http://localhost:3000/d-solo/rYdddlPWk/node-exporter-full?orgId=1&from=1701761600576&to=1701848000576&panelId=156"
          width="815"
          height="300"
        ></iframe>
      </div>
    </div>
  );
};

export default Dashboard;
