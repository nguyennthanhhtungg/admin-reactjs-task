import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    padding: 10
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: '50%'
  }
}));

function EmployeeInfoDialog({ employee, open, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Dialog open={open} onClose={handleClose} scroll="paper">
        <DialogTitle>Employee Detail</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText tabIndex={-1}>
            <Grid item container xs={12} sx={{ my: 2 }}>
              <Grid item xs={12}>
                <Box sx={{ mx: 1, my: 1 }} className={classes.root}>
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={employee.avatarUrl}
                      alt="avatar"
                      className={classes.avatar}
                    />
                  </div>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="no"
                    label="No"
                    name="no"
                    defaultValue={employee.employeeNo}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    defaultValue={employee.title}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    name="userName"
                    defaultValue={employee.employeeName}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    type="number"
                    id="phoneNumber"
                    defaultValue={employee.phoneNumber}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    name="email"
                    defaultValue={employee.email}
                    disabled
                  />
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      name="gender"
                      defaultValue={
                        employee.gender
                          ? employee.gender.split(' ').join('')
                          : 'Female'
                      }
                      row
                    >
                      <FormControlLabel
                        value="Female"
                        control={<Radio color="primary" disabled />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Male"
                        control={<Radio color="primary" disabled />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio color="primary" disabled />}
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
                    defaultValue={employee.marriageStatus}
                    disabled
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    defaultValue={employee.address}
                    disabled
                  />
                  <FormControl component="fieldset" required>
                    <FormLabel component="legend">Date of Birth</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        value={employee.dateOfBirth}
                        renderInput={(props) => (
                          <TextField className={classes.date} {...props} disabled />
                        )}
                        disabled
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="success">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(EmployeeInfoDialog);
