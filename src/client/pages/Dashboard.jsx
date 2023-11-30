import React, { useState, useEffect } from 'react';
// import Grid from '@mui/material/Grid';
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
import CommonCard from '../components/common/CommonCard/CommonCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import CommonButton from '../components/common/CommonButton/CommonButton';
import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { v4 as uuidv4 } from 'uuid';

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
  // const [currTab, setCurrTab] = useState('nodes');
  const [nodesArr, setNodesArr] = useState([]);
  // const [podsArr, setPodsArr] = useState([]);
  // const [deploymentsArr, setDeploymentsArr] = useState([]);
  // const [servicesArr, setServicesArr] = useState([]);

  // const [podsShowStatus, setPodsShowStatus] = useState(false);
  // const [deploymentShowStatus, setDeploymentShowStatus] = useState(false);
  // const [servicesShowStatus, setServicesShowStatus] = useState(false);

  // Function to handle search bar functionality
  const getSearchBar = () => {
    // Function to handle user inputs
    const handleChange = (value) => {
      console.log(value);
    };

    // Styles obj
    // TODO: Need to move styles to its own file
    const headerStyles = {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px',
        height: '65px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12',
      },
      addClusterButton: {
        fontSize: '1.05rem',
      },
    };

    return (
      <Box sx={headerStyles.wrapper}>
        <SearchBar
          placeholder="Search for a cluster"
          onChange={(e) => handleChange(e.target.value)}
          searchBarWidth="720px"
        />
        <Box>
          {/* <CommonButton
            variant="contained"
            onClick={addCluster}
            size="large"
            sx={headerStyles.addClusterButton}
          >
            Add cluster
          </CommonButton> */}
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  /**
   * Nodes
   */
  const [nodeShowStatus, setNodeShowStatus] = useState(true);

  // Function to handle tab change
  // const handleNodeShowStatus = () => {
  //   setDeploymentShowStatus(false);
  //   setNodeShowStatus(!nodeShowStat);
  // };

  // Function to send GET request to db
  const getCluster = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/cluster/get/', {
        credentials: 'include',
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err, 'Cluster POST request unsuccessful');
    }
  };

  // Function to get cluster data
  const getNodesList = async () => {
    const data = await getCluster();
    console.log(data);
    nodesArr.push({ ...data });
  };

  getNodesList();
  // Function to display
  const getDisplay = () => (
    <>
      {nodesArr.length ? (
        nodesArr.map((node, index) => (
          <Box key={uuidv4()} index={index} sx={{ marginBottom: '20px' }}>
            <iframe src={node} width="300" height="300" />
          </Box>
        ))
      ) : (
        <Typography
          align="center"
          sx={{
            margin: '40px 16px',
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1.3rem',
          }}
        >
          No data to display. 🫡🫡🫡
        </Typography>
      )}
    </>
  );

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
          <CommonCard header={getSearchBar()} content={getDisplay()} />
        </Container>
      </Box>
    </GridWrapper>
  );
};

export default Dashboard;
