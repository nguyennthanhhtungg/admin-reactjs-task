import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useContext, useState } from 'react';
import AppBarProvider from './AppBar/AppBar';
import SideBar from './SideBar/SideBar';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

function Layout(props) {
  const { children } = props;

  const [open, setOpen] = React.useState(true);
  const [compact, setCompact] = useState(false);

  const handleDrawerOpenToggle = () => {
    setOpen(!open);
  };

  const handleDrawerCompactToggle = () => {
    setCompact(!compact);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarProvider
        open={open}
        compact={compact}
        handleDrawerOpenToggle={handleDrawerOpenToggle}
        drawerWidth={drawerWidth}
      />
      <SideBar
        open={open}
        compact={compact}
        handleDrawerCompactToggle={handleDrawerCompactToggle}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
        style={{ marginLeft: open && !compact ? drawerWidth : 0 }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
