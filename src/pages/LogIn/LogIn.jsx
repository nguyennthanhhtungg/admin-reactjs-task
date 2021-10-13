import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useSnackbar } from 'notistack';
import Helmet from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import axiosInstance from 'utils/database';
import { useContext } from 'react';
import { AppContext } from 'contexts/AppContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://reactjs-task.vercel.app/">
        ReactJS Task
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const carouselData = [
  {
    carouselId: 1,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2015/10/12/15/18/store-984393__480.jpg'
  },
  {
    carouselId: 2,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2015/10/12/15/18/clothing-store-984396__340.jpg'
  },
  {
    carouselId: 3,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2016/11/19/15/40/clothes-1839935__340.jpg'
  },
  {
    carouselId: 4,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2017/08/10/01/23/shopping-2616824__340.jpg'
  },
  {
    carouselId: 5,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2018/08/08/16/17/shoes-3592530__340.jpg'
  },
  {
    carouselId: 6,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2017/07/31/11/33/people-2557483__340.jpg'
  },
  {
    carouselId: 7,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2017/09/12/12/01/wool-2742119__340.jpg'
  },
  {
    carouselId: 8,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2014/08/26/21/48/shirts-428600__340.jpg'
  },
  {
    carouselId: 9,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2016/07/28/19/36/clothing-1549070__340.jpg'
  },
  {
    carouselId: 10,
    carouselImageUrl:
      'https://cdn.pixabay.com/photo/2020/06/02/11/25/watercolor-5250585__340.jpg'
  }
];

function LogIn() {
  console.log('Hello LogIn');

  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const res = await axiosInstance.post(`/Auth/login`, {
        email: data.get('email'),
        password: data.get('password'),
        role: 'Employee'
      });

      if (data.get('isRememberMe') !== null) {
        localStorage.setItem('isRememberMe', true);
        localStorage.setItem('employee', JSON.stringify(res.data));
      } else {
        localStorage.setItem('isRememberMe', false);
        sessionStorage.setItem('employee', JSON.stringify(res.data));
      }

      dispatch({
        type: 'updateEmployee',
        payload: {
          employee: res.data
        }
      });

      history.push('/');
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In | React App</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{ display: { xs: 'none', md: 'block' } }}
        >
          <Carousel
            showArrows={false}
            showThumbs={false}
            showStatus={false}
            autoPlay
            infiniteLoop
          >
            {carouselData.map((carousel) => (
              <div key={carousel.carouselId}>
                <img
                  src={carousel.carouselImageUrl}
                  alt="carouselImageUrl"
                  style={{ height: '100vh' }}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="isRememberMe" color="primary" />}
                id="isRememberMe"
                name="isRememberMe"
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid item xs>
                <Link
                  to="/password/passwordReset"
                  variant="body2"
                  style={{ textDecoration: 'none' }}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default LogIn;
