import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Helmet from 'react-helmet';
import TableFooter from '@mui/material/TableFooter';
import useTheme from '@mui/material/styles/useTheme';
import { useHistory } from 'react-router-dom';
import axiosInstance from 'utils/database';
import AddIcon from '@mui/icons-material/Add';
import jsonFormat from 'json-format';
import { useSnackbar } from 'notistack';
import { StyledTableCell, StyledTableRow } from 'components/StyledTable/StyledTable';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  }
}));

function Configurations() {
  console.log('Hello Configurations');

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [configuration, setConfiguration] = useState({});

  useEffect(() => {
    async function loadConfigurationData() {
      try {
        const res = await axiosInstance.get(`/AppSettings`);
        setConfiguration(res.data);
      } catch (err) {
        enqueueSnackbar('Get configuration unsuccessfully!', { variant: 'error' });
      }
    }

    loadConfigurationData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Configuration Table | React App</title>
      </Helmet>
      <div className={classes.root}>
        <Typography
          variant="h4"
          style={{
            fontWeight: 'bolder',
            textAlign: 'center',
            color: 'blue',
            fontFamily: 'Roboto'
          }}
        >
          CONFIGURATION TABLE
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => history.push('/configurations/0')}
          startIcon={<AddIcon />}
          style={{ fontFamily: 'Roboto', marginBottom: 5 }}
        >
          NEW
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">KEY</StyledTableCell>
                <StyledTableCell align="center">VALUE</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(configuration).map((config, index) => (
                <StyledTableRow key={config[0]}>
                  <StyledTableCell align="center" style={{ fontWeight: 'bolder' }}>
                    {config[0]}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <div style={{ width: 650, overflow: 'auto' }}>
                      <pre>{jsonFormat(config[1])}</pre>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="warning"
                      startIcon={<EditIcon fontSize="inherit" />}
                      onClick={() => history.push(`/configurations/${config[0]}`)}
                    >
                      EDIT
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <StyledTableCell align="center">KEY</StyledTableCell>
                <StyledTableCell align="center">VALUE</StyledTableCell>
                <StyledTableCell align="center">OPERATION</StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Configurations;
