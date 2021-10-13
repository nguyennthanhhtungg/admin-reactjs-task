import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useSnackbar } from 'notistack';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useContext, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { AppContext } from 'contexts/AppContext';

const useStyles = makeStyles(() => ({
  root: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
    padding: 15
  },
  note: {
    padding: 15,
    borderColor: '#f7f2b5',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'solid',
    backgroundColor: '#ffffe0',
    color: 'gray'
  }
}));

function PasswordReset() {
  console.log('Hello PasswordReset');

  const classes = useStyles();
  const history = useHistory();
  const { dispatch } = useContext(AppContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Helmet>
        <title>Password Reset | React App</title>
      </Helmet>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', display: 'flex', justifyContent: 'center' }}
      >
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            className={classes.root}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Password Reset
            </Typography>
            <Divider variant="middle" flexItem style={{ margin: 15 }} />
            {isSent === false ? (
              <>
                <Typography variant="subtitle1" className={classes.note}>
                  Forgotten your password? Enter your e-mail address below, and we'll
                  send you an e-mail allowing you to reset it.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="email"
                    label="E-mail address"
                    type="email"
                    id="email"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Reset My Password
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="subtitle1" className={classes.note}>
                We have sent you an e-mail. Please contact us if you do not receive
                it within a few minutes.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default PasswordReset;
