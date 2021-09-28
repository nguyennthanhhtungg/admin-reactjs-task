import React from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ListSubheader from '@mui/material/ListSubheader';
import { useHistory } from 'react-router-dom';

import logo from '../../../logo.svg';

const openedMixin = (theme, drawerWidth) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden',
  backgroundColor: '#3c4b64',
  width: drawerWidth
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  backgroundColor: '#3c4b64',
  width: `calc(${theme.spacing(7)})`
});

const closedDrawer = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  backgroundColor: '#3c4b64',
  width: 0
});

const Drawer = styled(MuiDrawer)(({ theme, open, compact, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open &&
    !compact && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme, drawerWidth)
    }),

  ...(open &&
    compact && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),

  ...(!open && {
    ...closedDrawer(theme),
    '& .MuiDrawer-paper': closedDrawer(theme)
  })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer'
  },
  backgroundColor: '#303c54',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const useStyles = makeStyles(() => ({
  logo: {
    width: '60px',
    height: '60px'
  },
  icon: {
    color: 'lightgray'
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'blue'
    }
  },
  listSubheader: {
    backgroundColor: '#3c4b64',
    fontWeight: 'bolder',
    color: '#747c89'
  }
}));

function SideBar({ open, compact, handleDrawerCompactToggle, drawerWidth }) {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  const handleRedirectToDashboardPage = () => {
    history.push('/dashboard');
  };

  const handleRedirectToProductsPage = () => {
    history.push('/products');
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      compact={compact}
      drawerWidth={drawerWidth}
    >
      <DrawerHeader compact={compact}>
        <img className={classes.logo} src={logo} alt="Logo" />
        <Typography
          style={{
            color: 'lightgray',
            fontWeight: 'bolder',
            fontFamily: 'Roboto'
          }}
          onClick={handleRedirectToDashboardPage}
        >
          ADMIN REACT.JS
        </Typography>

        <IconButton onClick={handleDrawerCompactToggle}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon className={classes.icon} />
          ) : (
            <ChevronLeftIcon className={classes.icon} />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ width: '100%', color: 'lightgray' }} disablePadding>
        <ListItem
          button
          className={classes.listItem}
          onClick={handleRedirectToDashboardPage}
        >
          <ListItemIcon>
            <DashboardIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{ width: '100%', color: 'lightgray' }}
        subheader={
          !compact && (
            <ListSubheader component="div" className={classes.listSubheader}>
              ASSET
            </ListSubheader>
          )
        }
        disablePadding
      >
        <ListItem
          button
          className={classes.listItem}
          onClick={handleRedirectToProductsPage}
        >
          <ListItemIcon>
            <AcUnitOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <CategoryOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <LocationCityOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Companies" />
        </ListItem>
      </List>
      <Divider />
      <List
        sx={{ width: '100%', color: 'lightgray' }}
        subheader={
          !compact && (
            <ListSubheader component="div" className={classes.listSubheader}>
              ACCOUNT
            </ListSubheader>
          )
        }
        disablePadding
      >
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <PeopleOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <PeopleAltOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
      </List>
      <Divider />
      <List sx={{ width: '100%', color: 'lightgray' }} disablePadding>
        <ListItem button className={classes.listItem}>
          <ListItemIcon>
            <SettingsOutlinedIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
      <Divider />
      {compact && (
        <List
          sx={{
            color: 'lightgray',
            position: 'fixed',
            bottom: 0
          }}
        >
          <ListItem button onClick={handleDrawerCompactToggle}>
            <ListItemIcon>
              <ChevronRightIcon className={classes.icon} />
            </ListItemIcon>
          </ListItem>
        </List>
      )}
    </Drawer>
  );
}

export default SideBar;
