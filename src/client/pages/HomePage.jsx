import React, { useState } from 'react';
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

// Add Cluster functionality on this page
const HomePage = () => {
  // Function to handle search bar functionality
  const getSearchBar = () => {
    // Function to handle user inputs
    const handleChange = (value) => {
      console.log(value);
    };

    const addCluster = () => {
      console.log('click');
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

  // Function to get available Clusters
  const getCluster = () => (
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
  );

  return (
    <GridWrapper>
      <CommonCard header={getSearchBar()} content={getCluster()} />
    </GridWrapper>
  );
};

export default HomePage;
