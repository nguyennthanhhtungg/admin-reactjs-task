import React, { useEffect, useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
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

function App() {
  const [store, dispatch] = useReducer(AppReducer, defaultValue);

  console.log('Hello App');

  useEffect(() => {
    console.log('useEffect App');
    async function loadInitialData() {
      const categoryListRes = await axiosInstance.get(`/categories`);
      const supplierListRes = await axiosInstance.get(`/suppliers`);

      if (categoryListRes.status === 200 && supplierListRes.status === 200) {
        dispatch({
          type: 'init',
          payload: {
            categoryList: categoryListRes.data,
            supplierList: supplierListRes.data
          }
        });
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
            <Layout>
              <Switch>
                <Route exact path="/">
                  <Redirect to="/dashboard" />
                </Route>
                <Route exact path="/dashboard">
                  <Dashboard />
                </Route>
                <Route exact path="/products">
                  <Products />
                </Route>
                <Route exact path="/products/:id">
                  <ProductDetail />
                </Route>
                <Route exact path="/categories">
                  <Categories />
                </Route>
                <Route exact path="/categories/:id">
                  <CategoryDetail />
                </Route>
                <Route exact path="/suppliers">
                  <Suppliers />
                </Route>
                <Route exact path="/suppliers/:id">
                  <SupplierDetail />
                </Route>
              </Switch>
            </Layout>
          </SnackbarProvider>
        </AppContext.Provider>
      </ScrollToTop>
    </Router>
  );
}

export default App;
