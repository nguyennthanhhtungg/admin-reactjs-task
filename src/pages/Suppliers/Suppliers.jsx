import React, { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Helmet from 'react-helmet';
import TableFooter from '@mui/material/TableFooter';
import useTheme from '@mui/material/styles/useTheme';
import { useHistory } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from 'contexts/AppContext';
import { StyledTableCell, StyledTableRow } from 'components/StyledTable/StyledTable';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Suppliers() {
  console.log('Hello Suppliers');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>Supplier Table | React App</title>
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
          SUPPLIER TABLE
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => history.push('/suppliers/0')}
          startIcon={<AddIcon />}
          style={{ fontFamily: 'Roboto', marginBottom: 5 }}
        >
          NEW
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">LOGO</StyledTableCell>
                <StyledTableCell align="center">SUPPLIER NAME</StyledTableCell>
                <StyledTableCell align="center">LOCATION</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.supplierList.map((supplier, index) => (
                <StyledTableRow key={supplier.supplierId}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: 'bolder' }}
                    align="center"
                  >
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={supplier.logoUrl}
                      alt="categoryImage"
                      style={{ width: 50, height: 50 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {supplier.supplierName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {supplier.location}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      startIcon={<EditIcon fontSize="inherit" />}
                      onClick={() =>
                        history.push(`/suppliers/${supplier.supplierId}`)
                      }
                    >
                      EDIT
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <StyledTableCell align="center">#</StyledTableCell>
                <StyledTableCell align="center">LOGO</StyledTableCell>
                <StyledTableCell align="center">SUPPLIER NAME</StyledTableCell>
                <StyledTableCell align="center">LOCATION</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Suppliers;
