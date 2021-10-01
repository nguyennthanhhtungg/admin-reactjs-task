import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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
import Switch from '@mui/material/Switch';

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

function SuppplierDetail() {
  console.log('Hello SuppplierDetail');

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [supplierLogo, setSupplierLogo] = useState(null);
  const [description, setDescription] = React.useState(EditorState.createEmpty());

  const { enqueueSnackbar } = useSnackbar();
  const [supplier, setSupplier] = useState(null);
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    async function loadSupplier(supplierId) {
      const res = await axiosInstance.get(`/Suppliers/${supplierId}`);

      if (res.status === 200) {
        setSupplier(res.data);

        const blocksFromHtml = htmlToDraft(res.data.description);

        const { contentBlocks, entityMap } = blocksFromHtml;

        const entityMapContentState = ContentState.createFromBlockArray(
          contentBlocks,
          entityMap
        );

        setDescription(EditorState.createWithContent(entityMapContentState));
      }
    }
    if (parseInt(id, 10) !== 0) {
      loadSupplier(parseInt(id, 10));
    }
  }, [id]);

  const handleSupplierLogoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSupplierLogo(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (description.getCurrentContent().hasText() === false) {
      enqueueSnackbar('Please type description!', { variant: 'error' });
      return;
    }

    const bodyFormData = new FormData();

    bodyFormData.append('supplierId', id);

    Object.keys(data).forEach((key) => {
      if (key === 'logo') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    bodyFormData.append(
      'description',
      draftToHtml(convertToRaw(description.getCurrentContent()))
    );

    if (parseInt(id, 10) === 0) {
      try {
        const res = await axiosInstance.post(`/Suppliers`, bodyFormData, {
          'Content-Type': 'multipart/form-data'
        });

        if (res.status === 200) {
          enqueueSnackbar('Create supplier successfullt!', { variant: 'success' });

          dispatch({
            type: 'addNewSupplier',
            payload: res.data
          });

          history.push('/suppliers');
        }
      } catch (err) {
        enqueueSnackbar('Supplier info is invalid!', { variant: 'error' });
      }
    } else {
      try {
        const res = await axiosInstance.put(`/Suppliers`, bodyFormData, {
          'Content-Type': 'multipart/form-data'
        });

        if (res.status === 200) {
          enqueueSnackbar('Update supplier successfully!', { variant: 'success' });

          dispatch({
            type: 'updateSupplier',
            payload: res.data
          });

          history.push('/suppliers');
        }
      } catch (err) {
        enqueueSnackbar('Supplier info is invalid!', { variant: 'error' });
      }
    }
  };

  const handleDeleteSupplier = async () => {
    try {
      const res = await axiosInstance.delete(`/Suppliers/${id}`);

      dispatch({
        type: 'removeSupplier',
        payload: res.data
      });
      enqueueSnackbar('Delete supplier successfully!', { variant: 'success' });

      history.push('/suppliers');
    } catch (err) {
      enqueueSnackbar('You can not remove this supplier!', { variant: 'error' });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {parseInt(id, 10) === 0
            ? 'Create Supplier | React App'
            : 'Supplier Detail | React App'}
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
          {parseInt(id, 10) === 0 ? 'CREATE SUPPLIER' : 'SUPPLIER DETAIL'}
        </Typography>
        {(parseInt(id, 10) === 0 || (parseInt(id, 10) !== 0 && supplier)) && (
          <Box sx={{ flexGrow: 1, m: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12} md={3} />
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" className={classes.title}>
                    1. Supplier Name (*)
                  </Typography>
                  <input
                    placeholder="Enter Supplier Name"
                    defaultValue={supplier ? supplier.supplierName : ''}
                    className={classes.input}
                    {...register('supplierName')}
                    required
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    2. Location (*)
                  </Typography>
                  <input
                    placeholder="Enter Location"
                    defaultValue={supplier ? supplier.location : ''}
                    className={classes.input}
                    {...register('location')}
                    required
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    3. Image (*)
                  </Typography>
                  <input
                    type="file"
                    className={classes.input}
                    {...register('logo')}
                    onChange={handleSupplierLogoChange}
                    required={parseInt(id, 10) === 0}
                  />
                  <div style={{ textAlign: 'center' }}>
                    {parseInt(id, 10) === 0 && (
                      <img
                        src={
                          supplierLogo === null
                            ? 'https://via.placeholder.com/250'
                            : supplierLogo
                        }
                        alt="supplierLogo"
                        style={{ height: 250, width: 250 }}
                      />
                    )}
                    {supplier && parseInt(id, 10) !== 0 && (
                      <img
                        src={supplierLogo === null ? supplier.logoUrl : supplierLogo}
                        alt="supplierLogo"
                        style={{ height: 250, width: 250 }}
                      />
                    )}
                  </div>
                </Grid>
                <Grid item xs={12} md={3} />
                <Grid item xs={12} md={2} />
                <Grid item xs={12} md={8}>
                  <Typography variant="subtitle1" className={classes.title}>
                    4. Description (*)
                  </Typography>
                  <Editor
                    editorStyle={{ border: '1px solid #3c4b64', height: 350 }}
                    editorState={description}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={handleDescriptionChange}
                  />
                </Grid>
                <Grid item xs={12} md={2} />
                <Grid
                  item
                  xs={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: 15
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                    startIcon={<SaveIcon />}
                    type="submit"
                  >
                    SAVE
                  </Button>
                  {parseInt(id, 10) !== 0 && (
                    <Button
                      variant="contained"
                      size="large"
                      color="error"
                      style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteSupplier}
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
                    onClick={() => history.push(`/suppliers`)}
                  >
                    CANCEL
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        )}
      </div>
    </>
  );
}

export default SuppplierDetail;
