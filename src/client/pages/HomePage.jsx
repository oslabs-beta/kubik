import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NewClusterModal from '../components/ClusterEditor/NewClusterModal';
import { v4 as uuidv4 } from 'uuid';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Logo from '../../assets/kubik.svg';
import { useSpring, animated } from 'react-spring';
import { ToastContainer, toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#40444b',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: 'white',
}));

// Add Cluster functionality on this page
const HomePage = () => {
  // State for showing Cluster modal
  const [open, setOpen] = useState(false);
  const [clusters, setClusters] = useState([]);
  // const [openSnack, setOpenSnack] = useState(false);
  const [selectedClusterId, setSelectedClusterId] = useState(null);
  // const [displayClusters, setDisplayClusters] = useState(false);

  /*** Animations ***/
  //
  const buttonAnimation = useSpring({});

  // Function to addNewCluster
  const addNewCluster = async (data) => {
    const res = await fetch('http://localhost:3020/api/cluster/getclusters', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const updatedClusters = await res.json();
    setClusters(updatedClusters);
    setOpen(false);
    setSelectedClusterId(null);
  };

  // Conditional function for rendering
  const getContent = () => {
    // Styles objects
    const defaultStyles = {
      boxWrapper: {
        width: '100%',
        marginLeft: '260px',
        backgroundColor: '#1b2123',
        minHeight: '100vh',
        flexGrow: '1',
        paddingTop: '200px',
        justifyContent: 'center',
      },
      boxContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink',
      },
      paperContainer: {
        width: '500px',
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#2f3136',
      },
      buttonText: {
        alignSelf: 'center',
        position: 'fixed',
        marginTop: '35px',
        color: '#f8d49b',
      },
    };

    const gridStyles = {
      boxWrapper: {
        flexGrow: '1',
        paddingTop: '200px',
        justifyContent: 'center',
        backgroundColor: '#1b2123',
        width: '100%',
        marginLeft: '260px',
      },
      boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'column',
      },
      title: {
        marginLeft: '120px',
        color: '#f8d49b',
      },
      boxContent: {
        height: '100vh',
      },
      addClusterButton: {
        alignSelf: 'flex-end',
        marginRight: '200px',
      },
      gridContainer: {
        justifyContent: 'center',
      },
      gridItem: {
        backgroundColor: '#40444b',
        margin: '20px',
        border: 1,
        borderRadius: '12px',
      },
      stackContainer: {
        border: 1,
        borderRadius: '12px',
      },
    };

    /*** Functionality ***/
    const handleAddCluster = () => {
      setOpen(true);
    };

    const handleDeleteCluster = async (clusterId) => {
      try {
        const response = await fetch(
          `http://localhost:3020/api/cluster/delete/${clusterId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const res = await fetch(
          'http://localhost:3020/api/cluster/getclusters',
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedClusters = await res.json();
        setClusters(updatedClusters); // Assuming the server returns the updated list of clusters
      } catch (error) {
        console.error('Could not delete the cluster:', error);
        // Handle the error e.g., show an error message to the user
      }
    };

    // Conditional logic to render default (will render just a button to add clusters) or user's cluster
    const renderContent = () => {
      if (clusters.length) {
        return (
          <Box sx={gridStyles.boxWrapper}>
            <Box sx={gridStyles.boxContainer}>
              <Typography variant="h1" component="h1" sx={gridStyles.title}>
                Clusters
              </Typography>
              <Button
                variant="contained"
                sx={gridStyles.addClusterButton}
                onClick={handleAddCluster}
              >
                Add New Cluster
              </Button>
            </Box>
            <Box sx={gridStyles.boxContent}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sx: 8, md: 12 }}
                sx={gridStyles.gridContainer}
              >
                {clusters.map((cluster, index) => (
                  <Grid
                    xs={2}
                    sm={2}
                    md={2}
                    // key={cluster.id}
                    key={uuidv4()}
                    id={index}
                    sx={gridStyles.gridItem}
                  >
                    <Stack sx={gridStyles.stackContainer}>
                      <Item>Cluster Name: {cluster.clusterName}</Item>
                      <Item>Cluster Url: {cluster.clusterUrl}</Item>
                      {/* <Item>Cluster Port: {cluster.clusterPort}</Item> */}
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      sx={{ marginTop: '15px' }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteCluster(cluster._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        );
      } else {
        return (
          <Box sx={defaultStyles.boxWrapper}>
            <Typography variant="h1" component="h1" sx={gridStyles.title}>
              Home
            </Typography>
            <Box sx={defaultStyles.boxContainer}>
              <Paper sx={defaultStyles.paperContainer}>
                <Typography sx={defaultStyles.buttonText}>
                  Click to add a new cluster
                </Typography>
                <Button onClick={handleAddCluster}>
                  <img src={Logo} alt="kubik logo" />
                </Button>
              </Paper>
            </Box>
          </Box>
        );
      }
    };
    return <>{renderContent()}</>;
  };

  useEffect(() => {
    const getClusters = async () => {
      const response = await fetch(
        'http://localhost:3020/api/cluster/getclusters',
        {
          method: 'GET',
          credentials: 'include',
        }
      );
      const clustersData = await response.json();
      setClusters(clustersData);
    };

    getClusters();
  }, []);

  return (
    <>
      {getContent()}
      <NewClusterModal
        open={open}
        onClose={() => setOpen(false)}
        addNewCluster={addNewCluster}
      />
    </>
  );
};

export default HomePage;
