import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Layout from 'components/Layout/Layout';
import Dashboard from 'pages/Dashboard/Dashboard';
import Products from 'pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Layout>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetail />
            </Route>
          </Switch>
        </Layout>
      </ScrollToTop>
    </Router>
  );
}

export default App;
