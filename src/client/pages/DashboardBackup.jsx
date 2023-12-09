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

// import React, { useState, useEffect } from 'react';
// // import Panel from '../components/Panel/Panel';
// import GridWrapper from '../components/common/GridWrapper/GridWrapper';
// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/system';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import Paper from '@mui/material/Paper';
// import CommonCard from '../components/common/CommonCard/CommonCard';
// import SearchBar from '../components/common/SearchBar/SearchBar';
// import CommonButton from '../components/common/CommonButton/CommonButton';
// import { IconButton } from '@mui/material';
// import RefreshIcon from '@mui/icons-material/Refresh';
// import { v4 as uuidv4 } from 'uuid';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const Dashboard = () => {
//   // const [currTab, setCurrTab] = useState('nodes');
//   const [nodesArr, setNodesArr] = useState([]);
//   // const [podsArr, setPodsArr] = useState([]);
//   // const [deploymentsArr, setDeploymentsArr] = useState([]);
//   // const [servicesArr, setServicesArr] = useState([]);

//   // const [podsShowStatus, setPodsShowStatus] = useState(false);
//   // const [deploymentShowStatus, setDeploymentShowStatus] = useState(false);
//   // const [servicesShowStatus, setServicesShowStatus] = useState(false);

//   // Function to handle search bar functionality
//   const getSearchBar = () => {
//     // Function to handle user inputs
//     const handleChange = (value) => {
//       console.log(value);
//     };

//     // Styles obj
//     // TODO: Need to move styles to its own file
//     const headerStyles = {
//       wrapper: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingLeft: '20px',
//         paddingRight: '20px',
//         height: '65px',
//         backgroundColor: '#f5f5f5',
//         borderBottom: '1px solid rgba(0, 0, 0, 0.12',
//       },
//       addClusterButton: {
//         fontSize: '1.05rem',
//       },
//     };

//     return (
//       <Box sx={headerStyles.wrapper}>
//         <SearchBar
//           placeholder="Search for a cluster"
//           onChange={(e) => handleChange(e.target.value)}
//           searchBarWidth="720px"
//         />
//         <Box>
//           {/* <CommonButton
//             variant="contained"
//             onClick={addCluster}
//             size="large"
//             sx={headerStyles.addClusterButton}
//           >
//             Add cluster
//           </CommonButton> */}
//           <IconButton>
//             <RefreshIcon />
//           </IconButton>
//         </Box>
//       </Box>
//     );
//   };

//   /**
//    * Nodes
//    */
//   const [nodeShowStatus, setNodeShowStatus] = useState(true);

//   // Function to handle tab change
//   // const handleNodeShowStatus = () => {
//   //   setDeploymentShowStatus(false);
//   //   setNodeShowStatus(!nodeShowStat);
//   // };

//   // Function to send GET request to db
//   const getCluster = async () => {
//     try {
//       const response = await fetch('http://localhost:3020/api/cluster/get/', {
//         credentials: 'include',
//       });
//       const result = await response.json();
//       console.log(result);
//       return result;
//     } catch (err) {
//       console.log(err, 'Cluster POST request unsuccessful');
//     }
//   };

//   useEffect(() => {
//     const fetchNodes = async () => {
//       const nodes = await getCluster();
//       setNodesArr(nodes);
//     };

//     fetchNodes();
//   }, []);

//   // Function to display
//   const getDisplay = () => (
//     <>
//       {nodesArr.length ? (
//         <Stack
//           direction="row"
//           justifyContent="center"
//           alignItems="flex-start"
//           flexWrap="wrap"
//         >
//           {nodesArr.map((node, index) => (
//             <Box
//               key={uuidv4()}
//               index={index}
//               sx={{
//                 marginBottom: '20px',
//                 flex: '1 1 300px',
//                 minWidth: '300px',
//               }}
//             >
//               <iframe src={node} width="300" height="300" />
//             </Box>
//           ))}
//         </Stack>
//       ) : (
//         <Typography
//           align="center"
//           sx={{
//             margin: '40px 16px',
//             color: 'rgba(0, 0, 0, 0.6)',
//             fontSize: '1.3rem',
//           }}
//         >
//           No data to display. 🫡🫡🫡
//         </Typography>
//       )}
//     </>
//   );

//   return (
//     <GridWrapper>
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           py: 8,
//         }}
//       >
//         <Container maxWidth="xl">
//           <Stack spacing={3}>
//             <Stack direction="row" justifyContent="space-between" spacing={4}>
//               <Stack spacing={1}>
//                 <Typography variant="h2">Dashboard</Typography>
//                 <Stack
//                   alignItems="center"
//                   direction="row"
//                   divider={<Divider orientation="vertical" flexItem />}
//                   spacing={2}
//                 >
//                   <Item component="button">Nodes</Item>
//                   <Item component="button">Pods</Item>
//                   <Item component="button">Deployments</Item>
//                   <Item component="button">Services</Item>
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Stack>
//           <CommonCard header={getSearchBar()} content={getDisplay()} />
//         </Container>
//       </Box>
//     </GridWrapper>
//   );
// };

// export default Dashboard;
