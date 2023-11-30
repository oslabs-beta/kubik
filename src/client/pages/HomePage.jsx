import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import useLocation
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CommonCard from '../components/common/CommonCard/CommonCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import CommonButton from '../components/common/CommonButton/CommonButton';
import Typography from '@mui/material/Typography';
import RefreshIcon from '@mui/icons-material/Refresh';
import IconButton from '@mui/material/IconButton';
import GridWrapper from '../components/common/GridWrapper/GridWrapper';
// import CommonModal from '../components/common/CommonModal/CommonModal';
import NewClusterModal from '../components/ClusterEditor/NewClusterModal';
import { v4 as uuidv4 } from 'uuid';

// Add Cluster functionality on this page
const HomePage = () => {
  // State for showing Cluster modal
  const [open, setOpen] = useState(false);
  const [clusters, setClusters] = useState([]);

  // Function to handle search bar functionality
  const getSearchBar = () => {
    // Function to handle user inputs
    const handleChange = (value) => {
      console.log(value);
    };

    // Function to open NewClusterModal
    const addCluster = () => {
      setOpen(true);
      // console.log('click');
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
          <CommonButton
            variant="contained"
            onClick={addCluster}
            size="large"
            sx={headerStyles.addClusterButton}
          >
            Add cluster
          </CommonButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
        </Box>
      </Box>
    );
  };

  // Function to addNewCluster
  const addNewCluster = (data) => {
    clusters.push({ ...data });
    setOpen(false);
  };

  // Function to get available Clusters
  const getCluster = () => (
    <>
      {clusters.length ? (
        clusters.map((cluster, index) => (
          <Box key={uuidv4()} index={index} sx={{ marginBottom: '20px' }}>
            <Typography>Cluster Name: {cluster.clusterName}</Typography>
            <Typography>Cluster URL: {cluster.clusterUrl}</Typography>
            <Typography>Cluster Port: {cluster.clusterPort}</Typography>
          </Box>
        ))
      ) : (
        <Typography
          align="center"
          sx={{
            margin: '40px 16px',
            color: 'rgba(0, 0, 0, 0.6',
            fontSize: '1.3rem',
          }}
        >
          No clusters added yet
        </Typography>
      )}
    </>
  );

  return (
    <GridWrapper>
      <CommonCard header={getSearchBar()} content={getCluster()} />
      <NewClusterModal
        open={open}
        onClose={() => setOpen(false)}
        addNewCluster={addNewCluster}
      />
    </GridWrapper>
  );
};

export default HomePage;
