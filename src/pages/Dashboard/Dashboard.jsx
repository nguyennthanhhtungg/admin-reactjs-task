import React from 'react';
import { Container, Divider } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container>
      <Breadcrumbs>
        <Link to="/">Home</Link>
        <Link to="/">Asset</Link>
        <Link to="/">Breadcrumbs</Link>
      </Breadcrumbs>
      <Divider flexItem />
    </Container>
  );
}

export default Dashboard;
