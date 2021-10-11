import React, { useContext, useEffect, useReducer, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import Helmet from 'react-helmet';
import TableFooter from '@mui/material/TableFooter';
import useTheme from '@mui/material/styles/useTheme';
import { useHistory } from 'react-router-dom';
import axiosInstance from 'utils/database';
import AddIcon from '@mui/icons-material/Add';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { StyledTableCell, StyledTableRow } from 'components/StyledTable/StyledTable';
import { EMPLOYEE_ACTION_TYPE } from 'utils/constants';
import { useSnackbar } from 'notistack';
import EmployeeContext, { defaultValue } from './EmployeeContext';
import EmployeeReducer from './EmployeeReducer';

const EmployeeBodyTableRow = React.memo(({ employee, index, dispatch }) => {
  console.log('Hello EmployeeBodyTableRow');

  const { enqueueSnackbar } = useSnackbar();

  const handleViewEmployeeDetail = () => {
    console.log('View Employee Detail!');
  };

  const handleLockEmployee = async () => {
    try {
      const res = await axiosInstance.get(
        `/Employees/LockEmployee?employeeId=${employee.employeeId}`
      );

      if (res.status === 200) {
        dispatch({
          type: EMPLOYEE_ACTION_TYPE.LOCK_EMPLOYEE,
          payload: {
            employee
          }
        });

        enqueueSnackbar('Lock employee successfully!', { variant: 'success' });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  const handleUnlockEmployee = async () => {
    try {
      const res = await axiosInstance.get(
        `/Employees/UnlockEmployee?employeeId=${employee.employeeId}`
      );

      if (res.status === 200) {
        dispatch({
          type: EMPLOYEE_ACTION_TYPE.UNLOCK_EMPLOYEE,
          payload: {
            employee
          }
        });

        enqueueSnackbar('Unlock employee successfully!', { variant: 'success' });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  return (
    <StyledTableRow>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ fontWeight: 'bolder' }}
        align="center"
      >
        {index + 1}
      </StyledTableCell>
      <StyledTableCell align="center">{employee.employeeNo}</StyledTableCell>
      <StyledTableCell align="center">
        <img
          src={employee.avatarUrl}
          alt="employeeImage"
          style={{ width: 50, height: 50 }}
        />
      </StyledTableCell>
      <StyledTableCell align="center">{employee.employeeName}</StyledTableCell>
      <StyledTableCell align="center">{employee.email}</StyledTableCell>
      <StyledTableCell align="center">{employee.phoneNumber}</StyledTableCell>
      <StyledTableCell align="center">
        {employee.isLocked === false ? (
          <LockOpenIcon color="success" fontSize="large" />
        ) : (
          <LockIcon color="error" fontSize="large" />
        )}
      </StyledTableCell>
      <StyledTableCell align="center">{employee.title}</StyledTableCell>
      <StyledTableCell align="center">
        {/* <Button */}
        {/*  variant="outlined" */}
        {/*  size="small" */}
        {/*  color="info" */}
        {/*  style={{ margin: 5 }} */}
        {/*  startIcon={<WebIcon fontSize="inherit" />} */}
        {/*  onClick={handleViewEmployeeDetail} */}
        {/* > */}
        {/*  VIEW */}
        {/* </Button> */}
        {employee.isLocked === false ? (
          <Button
            variant="outlined"
            size="small"
            color="warning"
            style={{ margin: 5 }}
            startIcon={<LockIcon fontSize="inherit" />}
            onClick={handleLockEmployee}
          >
            LOCK
          </Button>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="success"
            style={{ margin: 5 }}
            startIcon={<LockOpenIcon fontSize="inherit" />}
            onClick={handleUnlockEmployee}
          >
            UNLOCK
          </Button>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
});

EmployeeBodyTableRow.displayName = 'EmployeeBodyTableRow';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Employees() {
  console.log('Hello Employees');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [store, dispatch] = useReducer(EmployeeReducer, defaultValue);

  useEffect(() => {
    async function loadEmployeeData() {
      try {
        const res = await axiosInstance.get(`/Employees`);

        dispatch({
          type: EMPLOYEE_ACTION_TYPE.INIT,
          payload: {
            employeeList: res.data
          }
        });
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/login');
        }
      }
    }

    loadEmployeeData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Employee Table | React App</title>
      </Helmet>
      <EmployeeContext.Provider value={{ store, dispatch }}>
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
            EMPLOYEE TABLE
          </Typography>
          {/* <Button */}
          {/*  variant="contained" */}
          {/*  color="success" */}
          {/*  onClick={() => history.push('/employees/0')} */}
          {/*  startIcon={<AddIcon />} */}
          {/*  style={{ fontFamily: 'Roboto', marginBottom: 5 }} */}
          {/* > */}
          {/*  NEW */}
          {/* </Button> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">NO</StyledTableCell>
                  <StyledTableCell align="center">AVATAR</StyledTableCell>
                  <StyledTableCell align="center">NAME</StyledTableCell>
                  <StyledTableCell align="center">EMAIL</StyledTableCell>
                  <StyledTableCell align="center">PHONE NUMBER</StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                  <StyledTableCell align="center">TITLE</StyledTableCell>
                  <StyledTableCell align="center">OPERATION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.employeeList.map((employee, index) => (
                  <EmployeeBodyTableRow
                    key={employee.employeeId}
                    employee={employee}
                    index={index}
                    dispatch={dispatch}
                  />
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <StyledTableCell align="center">#</StyledTableCell>
                  <StyledTableCell align="center">NO</StyledTableCell>
                  <StyledTableCell align="center">AVATAR</StyledTableCell>
                  <StyledTableCell align="center">NAME</StyledTableCell>
                  <StyledTableCell align="center">EMAIL</StyledTableCell>
                  <StyledTableCell align="center">PHONE NUMBER</StyledTableCell>
                  <StyledTableCell align="center">STATUS</StyledTableCell>
                  <StyledTableCell align="center">TITLE</StyledTableCell>
                  <StyledTableCell align="center">OPERATION</StyledTableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </EmployeeContext.Provider>
    </>
  );
}

export default Employees;
