import React, { useContext, useEffect, useState } from 'react';
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
import { Link, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AppContext } from 'contexts/AppContext';
import axiosInstance from 'utils/database';

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
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { store, dispatch } = useContext(AppContext);
  const [avatar, setAvatar] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(
    new Date(store.employee.dateOfBirth)
  );

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const onSubmit = async (data) => {
    const bodyFormData = new FormData();

    bodyFormData.append('employeeId', store.employee.employeeId);
    bodyFormData.append('employeeNo', store.employee.employeeNo);
    bodyFormData.append('title', store.employee.title);
    bodyFormData.append('email', store.employee.email);
    bodyFormData.append('dateOfBirth', dateOfBirth.toISOString());

    Object.keys(data).forEach((key) => {
      if (key === 'avatar') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    try {
      const res = await axiosInstance.put(`/Employees`, bodyFormData, {
        'Content-Type': 'multipart/form-data'
      });

      if (res.status === 200) {
        enqueueSnackbar('Update profile successfully!', { variant: 'success' });

        const isRememberMe = localStorage.getItem('isRememberMe');
        if (isRememberMe === 'true') {
          localStorage.setItem('employee', JSON.stringify(res.data));
        } else if (isRememberMe === 'false') {
          sessionStorage.setItem('employee', JSON.stringify(res.data));
        }

        dispatch({
          type: 'updateEmployee',
          payload: {
            employee: res.data
          }
        });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    watch: watch2,
    formState: { errors: errors2 }
  } = useForm();
  const onSubmitPasswordChange = async (data) => {
    if (data.newPassword !== data.confirmNewPassword) {
      enqueueSnackbar('New Password and Confirm New Password dont match!', {
        variant: 'error'
      });
      return;
    }

    try {
      const res = await axiosInstance.post(`/Auth/ChangePassword`, {
        userId: store.employee.employeeId,
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        role: 'Employee'
      });

      enqueueSnackbar('Change password successfully!', {
        variant: 'success'
      });

      localStorage.removeItem('isRememberMe');
      localStorage.removeItem('employee');
      sessionStorage.removeItem('employee');

      history.push('/login');
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, {
        variant: 'error'
      });
    }
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
              sx={{ my: 2, backgroundColor: '#ffffe0' }}
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
                    id="employeeNo"
                    label="Employee No"
                    name="employeeNo"
                    defaultValue={store.employee.employeeNo}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={store.employee.title}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="employeeName"
                    label="Employee Name"
                    name="employeeName"
                    defaultValue={store.employee.employeeName}
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
                    defaultValue={parseInt(store.employee.phoneNumber, 10)}
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
                    defaultValue={store.employee.email}
                    disabled
                  />
                  <FormControl required component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      name="gender"
                      defaultValue={
                        store.employee.gender
                          ? store.employee.gender.split(' ').join('')
                          : 'Female'
                      }
                      row
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio color="primary" {...register('gender')} />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="marriageStatus"
                    label="Marriage Status"
                    name="marriageStatus"
                    defaultValue={store.employee.marriageStatus}
                    {...register('marriageStatus')}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    defaultValue={store.employee.address}
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
                    src={avatar === null ? store.employee.avatarUrl : avatar}
                    alt="avatar"
                    className={classes.avatar}
                  />
                  <input
                    type="file"
                    {...register('avatar')}
                    onChange={handleAvatarChange}
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
              sx={{ my: 2, backgroundColor: '#ffffe0' }}
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
