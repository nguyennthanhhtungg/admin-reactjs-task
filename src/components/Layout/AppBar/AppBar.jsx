import React, { useContext } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { Button } from '@mui/material';
import { AppContext } from 'contexts/AppContext';
import { useSnackbar } from 'notistack';
import axiosInstance from 'utils/database';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}));

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
  },
  subLink: {
    textDecoration: 'none',
    display: 'block',
    padding: 8,
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      backgroundColor: '#d3e9f3'
    }
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    pointerEvents: 'auto',
    padding: 5
  }
}));

function AppBarProvider({ open, compact, handleDrawerOpenToggle, drawerWidth }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const { store } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    try {
      const res = await axiosInstance.get('/Auth/Logout');

      if (res.status === 200) {
        localStorage.removeItem('isRememberMe');
        localStorage.removeItem('employee');
        sessionStorage.removeItem('employee');

        enqueueSnackbar('You have just logged out!', { variant: 'success' });
        history.push('/login');
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  const popoverOpen = Boolean(anchorEl);
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
          <div onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
            <IconButton size="large" edge="end" color="inherit">
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar
                  alt="avatar"
                  src={
                    store.employee
                      ? store.employee.avatarUrl
                      : '/static/images/avatar/1.jpg'
                  }
                />
              </StyledBadge>
            </IconButton>
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper
              }}
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              disableRestoreFocus
            >
              <div>
                <Button
                  className={classes.subLink}
                  onClick={() => history.push('/profile')}
                >
                  PROFILE
                </Button>
                <Button className={classes.subLink} onClick={handleLogOut}>
                  LOG OUT
                </Button>
              </div>
            </Popover>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default AppBarProvider;
