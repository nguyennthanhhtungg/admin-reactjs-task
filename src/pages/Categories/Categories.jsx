import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import styled from '@mui/material/styles/styled';
import TableCell from '@mui/material/TableCell';
import tableCellClasses from '@mui/material/TableCell/tableCellClasses';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WebIcon from '@mui/icons-material/Web';
import Helmet from 'react-helmet';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import useTheme from '@mui/material/styles/useTheme';
import { useHistory } from 'react-router-dom';
import axiosInstance from 'utils/database';
import numberWithCommas from 'utils/currency';
import AddIcon from '@mui/icons-material/Add';
import { AppContext } from 'contexts/AppContext';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bolder',
    fontFamily: 'Roboto'
  },
  [`&.${tableCellClasses.footer}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bolder',
    fontFamily: 'Roboto'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Categories() {
  console.log('Hello Categories');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);

  return (
    <>
      <Helmet>
        <title>Category Table | React App</title>
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
          CATEGORY TABLE
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => history.push('/categories/0')}
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
                <StyledTableCell align="center">IMAGE</StyledTableCell>
                <StyledTableCell align="center">CATEGORY NAME</StyledTableCell>
                <StyledTableCell align="center">ACTIVE</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.categoryList.map((category, index) => (
                <StyledTableRow key={category.categoryId}>
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
                      src={category.imageUrl}
                      alt="categoryImage"
                      style={{ width: 50, height: 50 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {category.categoryName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {category.active === true ? (
                      <CheckIcon color="success" fontSize="large" />
                    ) : (
                      <CancelIcon color="error" fontSize="large" />
                    )}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      startIcon={<EditIcon fontSize="inherit" />}
                      onClick={() =>
                        history.push(`/categories/${category.categoryId}`)
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
                <StyledTableCell align="center">IMAGE</StyledTableCell>
                <StyledTableCell align="center">CATEGORY NAME</StyledTableCell>
                <StyledTableCell align="center">ACTIVE</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Categories;
