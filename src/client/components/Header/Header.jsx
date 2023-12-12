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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#101F33',
      borderBottom: '1px solid #fff',
    },
    middleRow: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '40px',
      marginBottom: '30px',
      marginLeft: '280px',
    },
    title: {
      fontSize: '25px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    welcome: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.7)',
      alignSelf: 'flex-end',
      marginLEft: 'auto',
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
        <Box>
          <Typography variant="h1" sx={headerStyles.title}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h1" sx={headerStyles.welcome}>
            Welcome {fullname}!
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
