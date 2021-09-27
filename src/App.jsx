import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import Layout from 'components/Layout/Layout';
import Dashboard from 'pages/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </Layout>
      </ScrollToTop>
    </Router>
  );
}

export default App;
