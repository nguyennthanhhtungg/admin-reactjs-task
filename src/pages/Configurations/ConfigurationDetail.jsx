import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import axiosInstance from 'utils/database';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import trimNewlines from 'trim-newlines';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  title: {
    fontWeight: 'bolder',
    marginTop: 10,
    fontSize: 'large',
    fontFamily: 'Roboto'
  },
  input: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    width: '100%',
    fontSize: 'large',
    fontFamily: 'Roboto'
  }
}));

function ConfigurationDetail() {
  console.log('Hello ConfigurationDetail');

  const classes = useStyles();
  const history = useHistory();
  const { key } = useParams();

  const JSONInputRef = useRef(null);
  const [currentKey, setCurrentKey] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [currentType, setCurrentType] = useState('object');

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function loadConfiguration(configKey) {
      const res = await axiosInstance.get(`/AppSettings/${configKey}`);

      if (res.status === 200) {
        setCurrentKey(key);
        setCurrentType(typeof res.data);

        if (typeof res.data === 'object') {
          JSONInputRef.current.refContent.innerText = JSON.stringify(res.data);
        } else {
          setCurrentValue(res.data);
        }
      }
    }
    if (key !== '0') {
      loadConfiguration(key);
    }
  }, [key]);

  const handleKeyChange = (e) => {
    setCurrentKey(e.target.value);
  };

  const handleSaveConfiguration = async () => {
    if (currentKey === '') {
      enqueueSnackbar('Please type key!', { variant: 'error' });
      return;
    }

    if (currentType === 'object') {
      if (JSONInputRef.current.refContent.innerText === '') {
        enqueueSnackbar('Please type value!', { variant: 'error' });
        return;
      }
    } else if (currentValue === '' || Number.isNaN(currentValue)) {
      enqueueSnackbar('Please type value!', { variant: 'error' });
      return;
    }

    try {
      const res = await axiosInstance.put(`/AppSettings`, {
        key: currentKey,
        value:
          currentType === 'object'
            ? JSON.parse(JSONInputRef.current.state.json)
            : currentValue
      });

      if (res.status === 200) {
        enqueueSnackbar('Save configuration successfully!', { variant: 'success' });
        history.push('/Configurations');
      }
    } catch (err) {
      enqueueSnackbar('Save configuration unsuccessfully!', { variant: 'error' });
    }
  };

  const handleRemoveConfiguration = async () => {
    try {
      const res = await axiosInstance.delete(`/AppSettings?key=${currentKey}`);

      if (res.status === 200) {
        enqueueSnackbar('Remove configuration successfully!', {
          variant: 'success'
        });

        history.push('/Configurations');
      }
    } catch (err) {
      enqueueSnackbar('Remove configuration unsuccessfully!', { variant: 'error' });
    }
  };

  const handleValueChange = (e) => {
    if (currentType === 'number') {
      setCurrentValue(parseFloat(e.target.value));
    } else {
      setCurrentValue(e.target.value);
    }
  };

  const handleTypeChange = (e) => {
    setCurrentType(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>
          {key !== '0'
            ? 'Create Configuration | React App'
            : 'Configuration Detail | React App'}
        </title>
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
          {key !== '0' ? 'CONFIGURATION DETAIL' : 'CREATE CONFIGURATION'}
        </Typography>
        <Box sx={{ flexGrow: 1, m: 1 }}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3} />
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" className={classes.title}>
                {key === '0' ? '1. Key:' : `1. Key: ${key}`}
              </Typography>
              {key === '0' && (
                <>
                  <input
                    value={currentKey}
                    onChange={handleKeyChange}
                    placeholder="Enter Key"
                    className={classes.input}
                    required
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    2. Type
                  </Typography>
                  <select
                    className={classes.input}
                    value={currentType}
                    onBlur={handleTypeChange}
                    onChange={handleTypeChange}
                  >
                    <option value="object">Object</option>
                    <option value="number">Number</option>
                    <option value="string">String</option>
                  </select>
                </>
              )}
              <Typography variant="subtitle1" className={classes.title}>
                {key === '0' ? '3. Value' : '2. Value'}
              </Typography>
              {currentType === 'object' && (
                <JSONInput
                  ref={JSONInputRef}
                  locale={locale}
                  height="350px"
                  width="100%"
                />
              )}
              {currentType === 'number' && (
                <input
                  type="number"
                  value={currentValue}
                  onChange={handleValueChange}
                  placeholder="Enter Value"
                  className={classes.input}
                  required
                />
              )}
              {currentType === 'string' && (
                <input
                  value={currentValue}
                  onChange={handleValueChange}
                  placeholder="Enter Value"
                  className={classes.input}
                  required
                />
              )}
            </Grid>
            <Grid item xs={12} md={3} />
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                color="primary"
                style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                startIcon={<SaveIcon />}
                onClick={handleSaveConfiguration}
              >
                SAVE
              </Button>
              {key && (
                <Button
                  variant="contained"
                  size="large"
                  color="error"
                  style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                  startIcon={<DeleteIcon />}
                  onClick={handleRemoveConfiguration}
                >
                  REMOVE
                </Button>
              )}
              <Button
                variant="contained"
                size="large"
                color="warning"
                style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                startIcon={<CancelIcon />}
                onClick={() => history.push(`/configurations`)}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default ConfigurationDetail;
