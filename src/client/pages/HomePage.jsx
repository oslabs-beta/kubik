import React, { useState } from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'black',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// Add Cluster functionality on this page
const HomePage = () => {
  // State for showing Cluster modal
  const [open, setOpen] = useState(false);
  const [clusters, setClusters] = useState([]);
  // const [openSnack, setOpenSnack] = useState(false);
  const [selectedClusterId, setSelectedClusterId] = useState(null);
  // const [displayClusters, setDisplayClusters] = useState(false);

  // Function to addNewCluster
  const addNewCluster = (data) => {
    if (selectedClusterId) {
      setClusters(
        clusters.map((cluster) =>
          cluster.id === selectedClusterId
            ? { ...data, id: selectedClusterId }
            : cluster
        )
      );
    } else {
      setClusters([...clusters, { ...data, id: uuidv4() }]);
    }
    setOpen(false);
    setSelectedClusterId(null);
  };

  // Conditional function for rendering
  const getContent = () => {
    // Styles objects
    const gridStyles = {
      boxWrapper: {
        flexGrow: '1',
        paddingTop: '200px',
        justifyContent: 'center',
        backgroundColor: 'purple',
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
      },
      addClusterButton: {
        alignSelf: 'flex-end',
        marginRight: '200px',
      },
      gridContainer: {
        backgroundColor: 'orange',
        justifyContent: 'center',
      },
      gridItem: {
        backgroundColor: 'yellow',
        margin: '20px',
      },
    };

    /*** Functionality ***/
    const handleAddCluster = () => {
      setOpen(true);
      // console.log('click');
    };

    const handleDeleteCluster = (clusterId) => {
      setClusters(clusters.filter((cluster) => cluster.id !== clusterId));
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
                  key={cluster.id}
                  id={index}
                  sx={gridStyles.gridItem}
                >
                  <Stack>
                    <Item>Cluster Name: {cluster.clusterName}</Item>
                    <Item>Cluster Url: {cluster.clusterUrl}</Item>
                    <Item>Cluster Port: {cluster.clusterPort}</Item>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                  >
                    <Button
                      variant="contained"
                      onClick={() => handleDeleteCluster(cluster.id)}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      } else {
        return (
          <Box
            sx={{
              width: '100%',
              marginLeft: '260px',
              backgroundColor: 'green',
              minHeight: '100vh',
              flexGrow: '1',
              paddingTop: '200px',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h1" component="h1" sx={gridStyles.title}>
              Home
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'pink',
              }}
            >
              <Paper
                sx={{
                  width: '500px',
                  height: '500px',
                  backgroundColor: 'purple',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    alignSelf: 'center',
                    position: 'fixed',
                    marginTop: '35px',
                  }}
                >
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

// 6574fa090e4f728dacd6c583 <-- mongo cluster id
