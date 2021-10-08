import React, { useEffect, useReducer } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Layout from 'components/Layout/Layout';
import Dashboard from 'pages/Dashboard/Dashboard';
import Products from 'pages/Products/Products';
import Categories from 'pages/Categories/Categories';
import { AppContext, defaultValue } from 'contexts/AppContext';
import ProductDetail from 'pages/Products/ProductDetail';
import AppReducer from 'reducers/AppReducer';
import { SnackbarProvider } from 'notistack';
import Suppliers from 'pages/Suppliers/Suppliers';
import axiosInstance from 'utils/database';
import CategoryDetail from 'pages/Categories/CategoryDetail';
import SupplierDetail from 'pages/Suppliers/SupplierDetail';
import Configurations from 'pages/Configurations/Configurations';
import ConfigurationDetail from 'pages/Configurations/ConfigurationDetail';
import LogIn from 'pages/LogIn/LogIn';
import Employees from 'pages/Employees/Employees';
import NotFound from 'pages/NotFound/NotFound';
import InternalServerError from './pages/ InternalServerError/ InternalServerError';

function App() {
  console.log('Hello App');
  const history = useHistory();
  const [store, dispatch] = useReducer(AppReducer, defaultValue);

  useEffect(() => {
    console.log('useEffect App');
    async function loadInitialData() {
      try {
        const categoryListRes = await axiosInstance.get(`/categories`);
        const supplierListRes = await axiosInstance.get(`/suppliers`);

        const isRememberMe = localStorage.getItem('isRememberMe');
        let employee = {};
        if (isRememberMe === 'true') {
          employee = JSON.parse(localStorage.getItem('employee'));
        } else if (isRememberMe === 'false') {
          employee = JSON.parse(sessionStorage.getItem('employee'));
        }

        dispatch({
          type: 'init',
          payload: {
            employee,
            categoryList: categoryListRes.data,
            supplierList: supplierListRes.data
          }
        });
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/login');
        }
      }
    }
    loadInitialData();
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <AppContext.Provider value={{ store, dispatch }}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
          >
            <Switch>
              <Route exact path="/login">
                <LogIn />
              </Route>

              <PrivateRoute exact path="/">
                <Redirect to="/dashboard" />
              </PrivateRoute>
              <PrivateRoute exact path="/dashboard">
                <Dashboard />
              </PrivateRoute>
              <PrivateRoute exact path="/products">
                <Products />
              </PrivateRoute>
              <PrivateRoute exact path="/products/:id">
                <ProductDetail />
              </PrivateRoute>
              <PrivateRoute exact path="/categories">
                <Categories />
              </PrivateRoute>
              <PrivateRoute exact path="/categories/:id">
                <CategoryDetail />
              </PrivateRoute>
              <PrivateRoute exact path="/suppliers">
                <Suppliers />
              </PrivateRoute>
              <PrivateRoute exact path="/suppliers/:id">
                <SupplierDetail />
              </PrivateRoute>
              <PrivateRoute exact path="/employees">
                <Employees />
              </PrivateRoute>
              <PrivateRoute exact path="/configurations">
                <Configurations />
              </PrivateRoute>
              <PrivateRoute exact path="/configurations/:key">
                <ConfigurationDetail />
              </PrivateRoute>
              <Route
                exact
                path="/InternalServerError"
                x
                component={InternalServerError}
              />
              <Route component={NotFound} />
            </Switch>
          </SnackbarProvider>
        </AppContext.Provider>
      </ScrollToTop>
    </Router>
  );
}

function PrivateRoute({ children, path, ...rest }) {
  return (
    <Route
      {...rest}
      path={path}
      component={() =>
        localStorage.employee || sessionStorage.employee ? (
          <Layout>{children}</Layout>
        ) : (
          <Redirect
            to={{
              pathname: '/login'
              // state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
