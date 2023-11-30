import React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useParams, useNavigate } from 'react-router-dom';
import CommonButton from '../common/CommonButton/CommonButton';

// Import from mainNavbarItems, then use map to iterate through arr of items to display in navbar
import { mainNavbarItems } from './consts/mainNavbarItems';
import { navbarStyles } from './styles';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3020/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log('loggedout');
        navigate('/');
      } else {
        // need to handle error
        console.log('Failed to Sign Out');
      }
    } catch (error) {
      // need logic to handle error
      console.error('Network error:', error);
    }
  };

  return (
    <Drawer sx={navbarStyles.drawer} variant="permanent" anchor="left">
      <Toolbar />
      <Divider />
      <List>
        {mainNavbarItems.map((item) => (
          <ListItemButton key={item.id} onClick={() => navigate(item.route)}>
            <ListItemIcon sx={navbarStyles.icons}>{item.icon}</ListItemIcon>
            <ListItemText sx={navbarStyles.text} primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <CommonButton
        variant="contained"
        onClick={handleLogout}
        size="large"
        sx={{
          fontSize: '1.05rem',
        }}
      >
        Logout
      </CommonButton>
    </Drawer>
  );
};

export default Navbar;
