import React, { useEffect, useState } from 'react';
import { Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from '@mui/material/styles/styled';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import axiosInstance from 'utils/database';
import numberWithCommas from 'utils/currency';

const Item = styled(Paper)(({ theme, backgroundColor, backgroundImage }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: 'white',
  backgroundColor,
  backgroundImage
}));

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  link: {
    textDecoration: 'none'
  },
  key: {},
  value: {
    fontWeight: 'bolder'
  }
}));

function Dashboard() {
  console.log('Hello Dashboard');
  const classes = useStyles();
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function loadInitialData() {
      const totalProductsRes = await axiosInstance.get(`/Products/TotalProducts`);

      if (totalProductsRes.status === 200) {
        setTotalProducts(totalProductsRes.data);
      }

      const totalCustomersRes = await axiosInstance.get(`/Customers/TotalCustomers`);

      if (totalCustomersRes.status === 200) {
        setTotalCustomers(totalCustomersRes.data);
      }

      const totalEmployeesRes = await axiosInstance.get(`/Employees/TotalEmployees`);

      if (totalEmployeesRes.status === 200) {
        setTotalEmployees(totalEmployeesRes.data);
      }

      const totalRevenueRes = await axiosInstance.get(`/Orders/TotalRevenue`);

      if (totalRevenueRes.status === 200) {
        setTotalRevenue(totalRevenueRes.data);
      }

      const today = new Date();
      const date = new Date();
      date.setDate(today.getDate() - 6);

      const chartDataRes = await axiosInstance.get(
        `/Orders/TopProductNumberAndOrderNumberByDate?fromDateTime=${date.toISOString()}&toDateTime=${today.toISOString()}`
      );

      if (chartDataRes.status === 200) {
        setChartData(chartDataRes.data);
      }
    }

    loadInitialData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard | React App</title>
      </Helmet>
      <div className={classes.root}>
        <Breadcrumbs
          separator="›"
          sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
        >
          <Link to="/dashboard" className={classes.link}>
            Home
          </Link>
          <Link to="/dashboard" className={classes.link}>
            Dashboard
          </Link>
        </Breadcrumbs>
        <Divider
          sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}
          style={{ marginBottom: 20 }}
          flexItem
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Item
              backgroundColor="#23189b"
              backgroundImage="linear-gradient(to bottom left, #23189b, #4335cc)"
            >
              <Typography variant="h4" className={classes.value}>
                {totalProducts}
              </Typography>
              <Typography variant="h6" className={classes.key}>
                Total Products
              </Typography>
              <div style={{ textAlign: 'end' }}>
                <img src="./total_products.png" alt="Total Products" />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              backgroundColor="#3186cd"
              backgroundImage="linear-gradient(to bottom left, #3186cd, #5ba6ee)"
            >
              <Typography variant="h4" className={classes.value}>
                {totalCustomers}
              </Typography>
              <Typography variant="h6" className={classes.key}>
                Total Customers
              </Typography>
              <div style={{ textAlign: 'end' }}>
                <img src="./total_customers.png" alt="Total Customers" />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              backgroundColor="#f69912"
              backgroundImage="linear-gradient(to bottom left, #f69912, #fac044)"
            >
              <Typography variant="h4" className={classes.value}>
                {totalEmployees}
              </Typography>
              <Typography variant="h6" className={classes.key}>
                Total Employees
              </Typography>
              <div style={{ textAlign: 'end' }}>
                <img src="./total_employees.png" alt="Total Employees" />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item
              backgroundColor="#da4041"
              backgroundImage="linear-gradient(to bottom left, #da4041, #e55252)"
            >
              <Typography variant="h4" className={classes.value}>
                {numberWithCommas(totalRevenue)}
              </Typography>
              <Typography variant="h6" className={classes.key}>
                Revenue
              </Typography>
              <div style={{ textAlign: 'end' }}>
                <img src="./revenue.png" alt="Revenue" />
              </div>
            </Item>
          </Grid>
        </Grid>
        <div style={{ marginTop: 30 }}>
          <ResponsiveContainer width="99%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="product"
                name="Product"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="order" name="Order" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
