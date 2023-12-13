import React from 'react';
import CommonButton from '../common/CommonButton/CommonButton';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import Box from '@mui/material/Box';

const Header = ({ title, fullname }) => {
  const headerStyles = {
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      // alignItems: 'baseline',
      backgroundColor: '#101F33',
      // borderBottom: '1px solid #fff',
      zIndex: 2,
      height: '120px',
    },
    middleRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'flex-end',
      // marginTop: '40px',
      // marginBottom: '30px',
      marginLeft: '260px',
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: '34px',
      letterSpacing: '3px',
      color: 'rgba(255, 255, 255, 0.7)',
      // alignSelf: 'flex-end',
      // paddingLeft: '180px',
      paddingTop: '60px',
      paddingRight: '640px',
    },
    welcome: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.7)',
      marginLeft: '200px',
      paddingRight: '60px',
    },
    // topRow: {
    //   display: 'flex',
    //   flexDirection: 'row',
    //   justifyContent: 'end',
    //   alignItems: 'center',
    //   '*': {
    //     marginRight: '5px',
    //   },
    // },
    // link: {
    //   fontWeight: 500,
    //   color: 'rgba(255, 255, 255, 0.7)',
    //   '&:hover': {
    //     color: '#fff',
    //     cursor: 'pointer',
    //   },
    // },
    // webButton: {
    //   marginRight: '5px',
    // },
  };

  return (
    <Box sx={headerStyles.wrapper}>
      {/* <Box sx={headerStyles.topRow}>
        <Typography sx={headerStyles.link}>Go to docs</Typography>
        <Avatar src="https://mui.com/static/images/avatar/1.jpg" />
      </Box> */}
      <Box sx={headerStyles.middleRow}>
        <Box sx={{}}>
          <Typography variant="h1" sx={headerStyles.title}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ marginLeft: '40px' }}>
          <Typography variant="h1" sx={headerStyles.welcome}>
            Welcome, {fullname}!
          </Typography>
        </Box>
        {/* <Box>
          <CommonButton sx={headerStyles.webButton} variant="outlined">
            Web setup
          </CommonButton>
          <Tooltip title="Help">
            <IconButton color="white" sx={headerStyles.helpIcon}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </Box> */}
      </Box>
    </Box>
  );
};

export default Header;
