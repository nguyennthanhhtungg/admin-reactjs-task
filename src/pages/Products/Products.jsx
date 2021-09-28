import React from 'react';
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
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WebIcon from '@mui/icons-material/Web';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bolder'
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

function createData(
  id,
  productCode,
  productName,
  category,
  supplier,
  price,
  discount
) {
  return { id, productCode, productName, category, supplier, price, discount };
}

const rows = [
  createData(
    1,
    'ABC123',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
    'Quần Áo',
    'Capgemini',
    123456,
    24
  ),
  createData(
    2,
    'ABC123',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    'Quần Áo',
    'Capgemini',
    123456,
    24
  )
];

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Products() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">#</StyledTableCell>
              <StyledTableCell align="center">CODE</StyledTableCell>
              <StyledTableCell align="center">NAME</StyledTableCell>
              <StyledTableCell align="center">CATEGORY</StyledTableCell>
              <StyledTableCell align="center">SUPPLIER</StyledTableCell>
              <StyledTableCell align="center">PRICE</StyledTableCell>
              <StyledTableCell align="center">DISCOUNT (%)</StyledTableCell>
              <StyledTableCell align="center">OPERATION</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{ fontWeight: 'bolder' }}
                >
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.productCode}</StyledTableCell>
                <StyledTableCell align="left">{row.productName}</StyledTableCell>
                <StyledTableCell align="center">{row.category}</StyledTableCell>
                <StyledTableCell align="center">{row.supplier}</StyledTableCell>
                <StyledTableCell align="center">{row.price}</StyledTableCell>
                <StyledTableCell align="center">{row.discount}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="outlined"
                    type="link"
                    size="small"
                    href={`/products/${row.id}`}
                    color="warning"
                    style={{ marginRight: 5 }}
                    startIcon={<EditIcon fontSize="inherit" />}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="outlined"
                    type="link"
                    size="small"
                    href={`${process.env.REACT_APP_REACTJS_WEBSITE}/product/${row.id}`}
                    target="_blank"
                    color="success"
                    style={{ marginLeft: 5 }}
                    startIcon={<WebIcon fontSize="inherit" />}
                  >
                    VIEW
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Products;
