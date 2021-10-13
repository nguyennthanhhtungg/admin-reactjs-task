import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useForm } from 'react-hook-form';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: '50%',
    display: 'block'
  }
}));

function Profile() {
  console.log('Hello Profile!');
  const classes = useStyles();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    formState: { errors: errors2 }
  } = useForm();
  const onSubmitPasswordChange = (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>My Profile | React App</title>
      </Helmet>
      <div className={classes.root}>
        <Typography
          variant="h4"
          style={{
            fontWeight: 'bolder',
            textAlign: 'center',
            color: 'blue',
            fontFamily: 'Roboto'
          }}
        >
          MY PROFILE
        </Typography>
        <Grid container component="main">
          <CssBaseline />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              item
              container
              xs={12}
              sx={{ my: 2 }}
              component={Paper}
              elevation={6}
              square
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ my: 1, mx: 1 }}
                  style={{
                    color: 'gray',
                    fontFamily: 'Roboto'
                  }}
                >
                  Manage profile for security
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ mx: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue="Director"
                    {...register('title')}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="employeeName"
                    label="Employee Name"
                    name="employeeName"
                    {...register('employeeName')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    type="number"
                    id="phoneNumber"
                    {...register('phoneNumber')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    {...register('email')}
                    disabled
                  />
                  <FormControl required component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup name="gender" defaultValue="female" row>
                      <FormControlLabel
                        value="female"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    {...register('address')}
                  />
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Date of Birth (*)</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={dateOfBirth}
                        onChange={(newValue) => setDateOfBirth(newValue)}
                        renderInput={(props) => <TextField {...props} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    SAVE
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={5}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <div>
                  <img
                    src="https://via.placeholder.com/250"
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <input
                    type="file"
                    {...register('avatar')}
                    required
                    style={{ display: 'block' }}
                  />
                </div>
              </Grid>
            </Grid>
          </form>

          <form onSubmit={handleSubmit2(onSubmitPasswordChange)}>
            <Grid
              item
              container
              xs={12}
              sx={{ my: 2 }}
              component={Paper}
              elevation={6}
              square
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ my: 1, mx: 1 }}
                  style={{
                    color: 'gray',
                    fontFamily: 'Roboto'
                  }}
                >
                  Password Change
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Box sx={{ mx: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="oldPassword"
                    label="Old Password"
                    name="oldPassword"
                    type="password"
                    {...register2('oldPassword')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="newPassword"
                    label="New Password"
                    name="newPassword"
                    type="password"
                    {...register2('newPassword')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    type="password"
                    {...register2('confirmNewPassword')}
                  />
                  <Link
                    to="/password/passwordReset"
                    style={{ textDecoration: 'none' }}
                  >
                    I forgot my password
                  </Link>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    CHANGE
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </>
  );
}

export default Profile;
