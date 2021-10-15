import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSnackbar } from 'notistack';
import Helmet from 'react-helmet';
import { Link, useHistory, useLocation } from 'react-router-dom';
import axiosInstance from 'utils/database';
import { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { AppContext } from 'contexts/AppContext';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    padding: 15
  },
  note: {
    padding: 15,
    borderColor: '#f7f2b5',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#ffffe0',
    color: 'gray'
  }
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ChangePassword() {
  console.log('Hello ChangePassword');
  const query = useQuery();
  const token = query.get('token').replace(/\s/g, '+');
  const email = query.get('email');

  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isSucceeded, setIsSucceeded] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    async function checkResetToken() {
      try {
        await axiosInstance.get(
          `/ResetTokens/CheckResetToken?token=${encodeURIComponent(
            token
          )}&email=${email}&role=Employee`
        );
      } catch (err) {
        setIsExpired(true);
        enqueueSnackbar(err.response.data.Message, {
          variant: 'error'
        });
      }
    }
    checkResetToken();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    console.log(data);

    if (data.newPassword !== data.confirmNewPassword) {
      enqueueSnackbar('New Password and Confirm New Pasword dont match!', {
        variant: 'error'
      });

      return;
    }

    try {
      const res = await axiosInstance.post(`/Auth/ForgotPassword`, {
        email,
        newPassword: data.newPassword,
        role: 'Employee'
      });

      setIsSucceeded(true);
      enqueueSnackbar('Change password successfully!', {
        variant: 'success'
      });
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, {
        variant: 'error'
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Change Password | React App</title>
      </Helmet>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            className={classes.root}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isExpired ? 'Bad Token' : 'Change Password'}
            </Typography>
            <Divider variant="middle" flexItem style={{ margin: 15 }} />
            {isSucceeded === false && isExpired === false && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="newPassword"
                    label="New Password"
                    type="password"
                    id="newPassword"
                    {...register('newPassword')}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    type="password"
                    id="confirmNewPassword"
                    {...register('confirmNewPassword')}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Change Password
                  </Button>
                </Box>
              </form>
            )}
            {isSucceeded === true && (
              <Typography variant="subtitle1" className={classes.note}>
                Your password is now changed{' '}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  {' '}
                  Login Now
                </Link>
                .
              </Typography>
            )}
            {isExpired === true && (
              <Typography variant="subtitle1" className={classes.note}>
                The password reset link was invalid, possibly because it has already
                been used. Please request a{' '}
                <Link
                  to="/password/passwordReset"
                  style={{ textDecoration: 'none' }}
                >
                  {' '}
                  new password reset
                </Link>
                .
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default ChangePassword;
