import React, { useEffect, useReducer, useState } from 'react';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { StyledTableCell, StyledTableRow } from 'components/StyledTable/StyledTable';
import { CUSTOMER_ACTION_TYPE } from 'utils/constants';
import { useSnackbar } from 'notistack';
import CustomerContext, { defaultValue } from './CustomerContext';
import CustomerReducer from './CustomerReducer';
import EmployeeInfoDialog from '../../components/EmployeeInfoDialog/EmployeeInfoDialog';
import CustomerInfoDialog from '../../components/CustomerInfoDialog/CustomerInfoDialog';

const CustomerBodyTableRow = React.memo(({ customer, index, dispatch }) => {
  console.log('Hello CustomerBodyTableRow');

  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLockCustomer = async () => {
    try {
      const res = await axiosInstance.get(
        `/Customers/LockCustomer?customerId=${customer.customerId}`
      );

      if (res.status === 200) {
        dispatch({
          type: CUSTOMER_ACTION_TYPE.LOCK_CUSTOMER,
          payload: {
            customer
          }
        });

        enqueueSnackbar('Lock customer successfully!', { variant: 'success' });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  const handleUnlockCustomer = async () => {
    try {
      const res = await axiosInstance.get(
        `/Customers/UnlockCustomer?customerId=${customer.customerId}`
      );

      if (res.status === 200) {
        dispatch({
          type: CUSTOMER_ACTION_TYPE.UNLOCK_CUSTOMER,
          payload: {
            customer
          }
        });

        enqueueSnackbar('Unlock customer successfully!', { variant: 'success' });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell
          component="th"
          scope="row"
          style={{ fontWeight: 'bolder' }}
          align="center"
        >
          {index + 1}
        </StyledTableCell>
        <StyledTableCell align="center">{customer.customerNo}</StyledTableCell>
        <StyledTableCell align="center">
          <img
            src={customer.avatarUrl}
            alt="employeeImage"
            style={{ width: 50, height: 50 }}
          />
        </StyledTableCell>
        <StyledTableCell align="center">{customer.customerName}</StyledTableCell>
        <StyledTableCell align="center">{customer.email}</StyledTableCell>
        <StyledTableCell align="center">{customer.phoneNumber}</StyledTableCell>
        <StyledTableCell align="center">
          {customer.isLocked === false ? (
            <LockOpenIcon color="success" fontSize="large" />
          ) : (
            <LockIcon color="error" fontSize="large" />
          )}
        </StyledTableCell>
        <StyledTableCell align="center">
          <Button
            variant="outlined"
            size="small"
            color="info"
            style={{ margin: 5 }}
            startIcon={<WebIcon fontSize="inherit" />}
            onClick={handleOpen}
          >
            VIEW
          </Button>
          {customer.isLocked === false ? (
            <Button
              variant="outlined"
              size="small"
              color="warning"
              style={{ margin: 5 }}
              startIcon={<LockIcon fontSize="inherit" />}
              onClick={handleLockCustomer}
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
              onClick={handleUnlockCustomer}
            >
              UNLOCK
            </Button>
          )}
        </StyledTableCell>
      </StyledTableRow>
      <CustomerInfoDialog
        customer={customer}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
});

CustomerBodyTableRow.displayName = 'CustomerBodyTableRow';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Customers() {
  console.log('Hello Customers');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [store, dispatch] = useReducer(CustomerReducer, defaultValue);

  useEffect(() => {
    async function loadCustomerData() {
      try {
        const res = await axiosInstance.get(`/Customers`);

        dispatch({
          type: CUSTOMER_ACTION_TYPE.INIT,
          payload: {
            customerList: res.data
          }
        });
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/login');
        }
      }
    }

    loadCustomerData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Customer Table | React App</title>
      </Helmet>
      <CustomerContext.Provider value={{ store, dispatch }}>
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
            CUSTOMER TABLE
          </Typography>
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
                  <StyledTableCell align="center">OPERATION</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.customerList.map((customer, index) => (
                  <CustomerBodyTableRow
                    key={customer.customerId}
                    customer={customer}
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
                  <StyledTableCell align="center">OPERATION</StyledTableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </CustomerContext.Provider>
    </>
  );
}

export default Customers;
