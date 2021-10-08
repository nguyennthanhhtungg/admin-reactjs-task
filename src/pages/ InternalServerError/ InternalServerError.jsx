import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function InternalServerError() {
  console.log('Hello InternalServerError');

  return (
    <Grid
      container
      component="main"
      sx={{ height: '100vh', backgroundColor: '#ebedef' }}
      alignItems="center"
    >
      <CssBaseline />
      <Grid item xs={12} elevation={6} square>
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="h2">500</Typography>
          <div style={{ marginLeft: 10 }}>
            <Typography variant="h6">Houston, we have a problem!</Typography>
            <Typography variant="subtitle1" style={{ color: 'gray' }}>
              The page you are looking for is temporarily unavailable.
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

export default InternalServerError;
