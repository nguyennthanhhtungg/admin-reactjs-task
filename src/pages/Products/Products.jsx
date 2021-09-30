import React, { useEffect, useState } from 'react';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
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

function Products() {
  console.log('Hello Products');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productNumber, setProductNumber] = useState(0);
  const [productListByPaginationParameters, setProductListByPaginationParameters] =
    useState([]);

  useEffect(() => {
    async function loadProductNumber() {
      const productNumberRes = await axiosInstance.get(`/Products/ProductNumber`);

      if (productNumberRes.status === 200) {
        setProductNumber(productNumberRes.data);
      }
    }

    loadProductNumber();
  }, []);

  useEffect(() => {
    async function loadProductListByPaginationParameters() {
      const productListRes = await axiosInstance.get(
        `/Products/ProductListByPaginationParameters?pageNumber=${
          page + 1
        }&pageSize=${rowsPerPage}`
      );

      if (productListRes.status === 200) {
        setProductListByPaginationParameters(productListRes.data);
      }
    }

    loadProductListByPaginationParameters();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title>Product Table | React App</title>
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
          PRODUCT TABLE
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => history.push('/products/0')}
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
                <StyledTableCell align="center">CODE</StyledTableCell>
                <StyledTableCell align="center">IMAGE</StyledTableCell>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">CATEGORY</StyledTableCell>
                <StyledTableCell align="center">SUPPLIER</StyledTableCell>
                <StyledTableCell align="center">PRICE</StyledTableCell>
                <StyledTableCell align="center">DISCOUNT (%)</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productListByPaginationParameters.map((product, index) => (
                <StyledTableRow key={product.productId}>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: 'bolder' }}
                  >
                    {rowsPerPage * page + index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.productCode}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={product.imageUrl}
                      alt="productImage"
                      style={{ width: 50, height: 50 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {product.productName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.category.categoryName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.supplier.supplierName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {numberWithCommas(product.price)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.discount}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      style={{ margin: 5 }}
                      startIcon={<EditIcon fontSize="inherit" />}
                      onClick={() => history.push(`/products/${product.productId}`)}
                    >
                      EDIT
                    </Button>
                    <Button
                      variant="outlined"
                      type="link"
                      size="small"
                      href={`${process.env.REACT_APP_REACTJS_WEBSITE}/product/${product.id}`}
                      target="_blank"
                      color="success"
                      style={{ margin: 5 }}
                      startIcon={<WebIcon fontSize="inherit" />}
                    >
                      VIEW
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow
                style={{
                  backgroundColor: theme.palette.primary.dark
                }}
              >
                <TablePagination
                  style={{
                    color: theme.palette.common.white
                  }}
                  rowsPerPageOptions={[10, 25, 50]}
                  count={productNumber}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Products;
