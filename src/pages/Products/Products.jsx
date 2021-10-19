import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
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
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import { StyledTableCell, StyledTableRow } from 'components/StyledTable/StyledTable';
import { AppContext } from 'contexts/AppContext';
import Badge from '@mui/material/Badge';
import { useSnackbar } from 'notistack';
import Comment from 'components/Comment/Comment';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

const ProductBodyTableRow = React.memo(({ number, product }) => {
  console.log('Hello ProductBodyTableRow');

  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const [newCommentNumber, setNewCommentNumber] = useState(0);

  useEffect(() => {
    async function loadNewCommentList() {
      try {
        const res = await axiosInstance.get(
          `/Comments/CommentListWithCustomerByProductIdAndStatus?productId=${product.productId}&status=NEW`
        );

        if (res.status === 200) {
          setNewCommentNumber(res.data.length);
        }
      } catch (err) {
        enqueueSnackbar(err.response.data.Message, { variant: 'error' });
      }
    }

    loadNewCommentList();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component="th" scope="row" style={{ fontWeight: 'bolder' }}>
          {number}
        </StyledTableCell>
        <StyledTableCell align="center">{product.productCode}</StyledTableCell>
        <StyledTableCell align="center">
          <img
            src={product.imageUrl}
            alt="productImage"
            style={{ width: 50, height: 50 }}
          />
        </StyledTableCell>
        <StyledTableCell align="left">{product.productName}</StyledTableCell>
        <StyledTableCell align="center">
          {product.category.categoryName}
        </StyledTableCell>
        <StyledTableCell align="center">
          {product.supplier.supplierName}
        </StyledTableCell>
        <StyledTableCell align="center">
          {numberWithCommas(product.price)}
        </StyledTableCell>
        <StyledTableCell align="center">{product.discount}</StyledTableCell>
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
            href={`${process.env.REACT_APP_REACTJS_WEBSITE}/product/${product.productId}`}
            target="_blank"
            color="info"
            style={{ margin: 5 }}
            startIcon={<WebIcon fontSize="inherit" />}
          >
            VIEW
          </Button>
          <IconButton>
            <Badge badgeContent={newCommentNumber} color="info">
              <CommentIcon color="success" onClick={handleClickOpen} />
            </Badge>
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <Comment open={open} handleClose={handleClose} product={product} />
    </>
  );
});

ProductBodyTableRow.displayName = 'ProductBodyTableRow';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  select: {
    padding: 7,
    fontSize: 'large',
    fontFamily: 'Roboto',
    borderRadius: 0,
    marginRight: 10
  },
  searchInput: {
    padding: 7,
    fontSize: 'large',
    fontFamily: 'Roboto',
    borderRadius: 0,
    borderWidth: 1,
    height: '100%',
    borderStyle: 'solid'
  },
  searchBtn: {
    height: '100%',
    borderRadius: 0
  }
}));

function Products() {
  console.log('Hello Products');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [productListByParameters, setProductListByParameters] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  async function loadProductListByParameters(keywords, categoryId) {
    setIsLoading(true);
    const productListByParametersRes = await axiosInstance.get(
      `/Products/ProductListByParameters?keywords=${keywords}&categoryId=${categoryId}`
    );

    if (productListByParametersRes.status === 200) {
      setProductListByParameters(productListByParametersRes.data);
    } else {
      setProductListByParameters([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadProductListByParameters(search, selectedCategory);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCategoryChange = async (e) => {
    setSearch('');
    setSelectedCategory(e.target.value);
    setPage(0);
    setRowsPerPage(10);
    await loadProductListByParameters('', e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = async (e) => {
    setPage(0);
    setRowsPerPage(10);
    await loadProductListByParameters(search, selectedCategory);
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
        <div style={{ display: 'flex', marginBottom: 5 }}>
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            className={classes.select}
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option key={-1} value={-1}>
              All Category
            </option>
            {store.categoryList.map((category) => {
              return (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              );
            })}
          </select>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              className={classes.searchInput}
              value={search}
              onChange={handleSearchChange}
              placeholder="Searching..."
            />
            <Button
              variant="contained"
              color="success"
              startIcon={<SearchIcon />}
              className={classes.searchBtn}
              onClick={handleSearchClick}
            />
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={() => history.push('/products/0')}
            startIcon={<AddIcon />}
            style={{ fontFamily: 'Roboto', marginLeft: 'auto' }}
          >
            NEW
          </Button>
        </div>
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
              {isLoading === true && (
                <StyledTableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    style={{ fontWeight: 'bolder' }}
                  >
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Skeleton />
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {isLoading === false &&
                productListByParameters
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => (
                    <ProductBodyTableRow
                      key={product.productId}
                      number={page * rowsPerPage + index + 1}
                      product={product}
                    />
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
                  rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                  count={productListByParameters.length}
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
