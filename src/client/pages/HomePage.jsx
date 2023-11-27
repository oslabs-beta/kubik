import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CommonCard from '../components/common/CommonCard/CommonCard';
import SearchBar from '../components/common/SearchBar/SearchBar';
import CommonButton from '../components/common/CommonButton/CommonButton';

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

    return (
      <Box>
        <SearchBar
          placeholder="Search for a cluster"
          onChange={(e) => handleChange(e.target.value)}
          searchBarWidth="700px"
        />
        <Box>
          <CommonButton variant="contained" onClick={addCluster} size="large">
            Add cluster
          </CommonButton>
        </Box>
      </Box>
    );
  };
  return (
    <Grid item xs={8} sx={{ marginLeft: '360px' }}>
      <CommonCard header={getSearchBar()} />
    </Grid>
  );
};

export default HomePage;
