import React, { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import { useSnackbar } from 'notistack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: '50%'
  }
}));

function CreateEmployee() {
  console.log('Hello CreateEmployee');

  const classes = useStyles();
  const history = useHistory();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const { store, dispatch } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Create Employee | React App</title>
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
          CREATE EMPLOYEE
        </Typography>
        <Box sx={{ flexGrow: 1, m: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12} md={3} />
              <Grid item xs={12} md={6}>
                <div>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src="https://via.placeholder.com/250"
                      alt="avatar"
                      className={classes.avatar}
                    />
                  </div>
                  <input type="file" {...register('avatar')} required />
                </div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="employeeNo"
                  label="Employee No"
                  name="employeeNo"
                  {...register('employeeNo')}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  {...register('title')}
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
                  label="Email Address"
                  type="email"
                  name="email"
                  {...register('email')}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="managerEmailAddres"
                  label="Manager Email Address"
                  type="email"
                  name="managerEmailAddres"
                  {...register('managerEmailAddress')}
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
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ margin: 10, width: 120 }}
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  SAVE
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  style={{ margin: 10, width: 120 }}
                  startIcon={<CancelIcon />}
                  onClick={() => history.push(`/employees`)}
                >
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </>
  );
}

export default CreateEmployee;
