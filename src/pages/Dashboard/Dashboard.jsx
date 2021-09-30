import React from 'react';
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

const data = [
  {
    name: '01/09/2021',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: '02/09/2021',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: '03/09/2021',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: '04/09/2021',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: '05/09/2021',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: '05/09/2021',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: '07/09/2021',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

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
  const classes = useStyles();
  console.log('Hello Dashboard');

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
                9.823
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
                9.823
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
                9.823
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
                9.823
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
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
