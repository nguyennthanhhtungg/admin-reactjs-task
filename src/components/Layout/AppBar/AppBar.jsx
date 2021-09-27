import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const AppBar = styled(MuiAppBar)(({ theme, open, compact, drawerWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: 'white',
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open &&
    compact && {
      marginLeft: 56,
      width: `calc(100% - ${56}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    }),
  ...(open &&
    !compact && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
}));

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    marginLeft: 20,
    marginRight: 20,
    color: 'gray',
    '&:hover': {
      color: 'black'
    }
  }
}));

function AppBarProvider({ open, compact, handleDrawerOpenToggle, drawerWidth }) {
  const classes = useStyles();
  return (
    <AppBar position="fixed" open={open} compact={compact} drawerWidth={drawerWidth}>
      <Toolbar style={{ display: 'flex' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpenToggle}
          edge="start"
          sx={{
            marginRight: '36px'
          }}
        >
          <MenuOutlinedIcon fontSize="large" style={{ color: 'black' }} />
        </IconButton>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Link to="/dashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/users" className={classes.link}>
            Users
          </Link>
          <Link to="/settings" className={classes.link}>
            Settings
          </Link>
        </Box>
        <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="warning">
              <EmailOutlinedIcon fontSize="large" style={{ color: 'black' }} />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsOutlinedIcon
                fontSize="large"
                style={{ color: 'black' }}
              />
            </Badge>
          </IconButton>
          <IconButton size="large" edge="end" color="inherit">
            <AccountCircleOutlinedIcon fontSize="large" style={{ color: 'black' }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppBarProvider;
