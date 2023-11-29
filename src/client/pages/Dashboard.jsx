import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import Panel from '../components/Panel/Panel';
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

// const Item = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   borderRadius: 4,
// }));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  // useLocation to get clusterData from HomePage
  const location = useLocation();
  // Deconstruct clusterData from location.state
  const { clusterData } = location.state || { clusterData: [] };
  console.log(clusterData);

  const [currTab, setCurrTab] = useState('nodes');
  const [nodesArr, setNodesArr] = useState([]);
  const [podsArr, setPodsArr] = useState([]);
  const [deploymentsArr, setDeploymentsArr] = useState([]);
  const [servicesArr, setServicesArr] = useState([]);

  const [podsShowStatus, setPodsShowStatus] = useState(false);
  const [deploymentShowStatus, setDeploymentShowStatus] = useState(false);
  const [servicesShowStatus, setServicesShowStatus] = useState(false);

  /**
   * Nodes
   */
  const [nodeShowStatus, setNodeShowStatus] = useState(false);

  // Function to handle tab change
  const handleNodeShowStatus = () => {
    setDeploymentShowStatus(false);
    setNodeShowStatus(!nodeShowStatus);
  };

  // Fetch nodes and populate nodesArr
  // useEffect(() => {
  //   fetch(`${clusterUrl}/api/cluster/get`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (NodeShowStatus) {
  //         setNodesArr(data);
  //       }
  //     });
  // }, [nodesArr]);

  /**
   * Conditions to determine what to render
   */

  return (
    <GridWrapper>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h2">Dashboard</Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}
                >
                  <Item component="button">Nodes</Item>
                  <Item component="button">Pods</Item>
                  <Item component="button">Deployments</Item>
                  <Item component="button">Services</Item>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </GridWrapper>
  );
};

export default Dashboard;
