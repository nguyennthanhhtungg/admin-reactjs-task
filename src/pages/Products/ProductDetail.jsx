import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm } from 'react-hook-form';
import Helmet from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { AppContext } from 'contexts/AppContext';
import axiosInstance from 'utils/database';
import { useSnackbar } from 'notistack';

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
  },
  date: {
    marginLeft: 10,
    marginRight: 10
  }
}));

function ProductDetail() {
  console.log('Hello ProductDetail');

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [productImage, setProductImage] = useState(null);
  const [shortDescription, setShortDescription] = React.useState(
    EditorState.createEmpty()
  );
  const [detailDescription, setDetailDescription] = React.useState(
    EditorState.createEmpty()
  );
  const { enqueueSnackbar } = useSnackbar();

  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (parseInt(id, 10) !== 0) {
      console.log(id);
    }
  }, [id]);

  const handleProductImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProductImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e);
  };

  const handleDetailDescriptionChange = (e) => {
    setDetailDescription(e);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    if (parseInt(data.categoryId, 10) === 0) {
      enqueueSnackbar('Please choose category type!', { variant: 'error' });
      return;
    }

    if (parseInt(data.supplierId, 10) === 0) {
      enqueueSnackbar('Please choose supplier!', { variant: 'error' });
      return;
    }

    if (parseInt(data.supplierId, 10) === 0) {
      enqueueSnackbar('Please choose supplier!', { variant: 'error' });
      return;
    }

    if (
      draftToHtml(convertToRaw(shortDescription.getCurrentContent())) === '<p></p>\n'
    ) {
      enqueueSnackbar('Please type short description!', { variant: 'error' });
      return;
    }

    if (
      draftToHtml(convertToRaw(detailDescription.getCurrentContent())) ===
      '<p></p>\n'
    ) {
      enqueueSnackbar('Please type detail description!', { variant: 'error' });
      return;
    }

    const bodyFormData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        bodyFormData.append(key, data[key][0]);
      } else if (key === 'manufacturingDate' || key === 'expiryDate') {
        bodyFormData.append(key, new Date(data[key]).toISOString());
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    bodyFormData.append(
      'shortDescription',
      draftToHtml(convertToRaw(shortDescription.getCurrentContent()))
    );
    bodyFormData.append(
      'detailDescription',
      draftToHtml(convertToRaw(detailDescription.getCurrentContent()))
    );

    if (parseInt(id, 10) === 0) {
      try {
        const res = await axiosInstance.post(`/Products`, bodyFormData, {
          'Content-Type': 'multipart/form-data'
        });

        if (res.status === 200) {
          enqueueSnackbar('Create product successfullt!', { variant: 'success' });
          history.push('/products');
        }
      } catch (err) {
        enqueueSnackbar('Product info is invalid!', { variant: 'success' });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {parseInt(id, 10) === 0
            ? 'Create Product | React App'
            : 'Product Detail | React App'}
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
          {parseInt(id, 10) === 0 ? 'CREATE PRODUCT' : 'PRODUCT DETAIL'}
        </Typography>
        <Box sx={{ flexGrow: 1, m: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className={classes.title}>
                  1. Product Code (*)
                </Typography>
                <input
                  placeholder="Enter Product Code"
                  className={classes.input}
                  {...register('productCode')}
                  required
                />
                <Typography variant="subtitle1" className={classes.title}>
                  2. Product Name (*)
                </Typography>
                <input
                  placeholder="Enter Product Name"
                  className={classes.input}
                  {...register('productName')}
                  required
                />
                <Grid container spacing={{ xs: 0, md: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      3. Price (*)
                    </Typography>
                    <input
                      placeholder="Enter Price"
                      type="number"
                      min={1}
                      className={`${classes.input} numberInput`}
                      {...register('price')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      4. Discount (*)
                    </Typography>
                    <input
                      placeholder="Enter Discount"
                      type="number"
                      min={0}
                      max={100}
                      className={`${classes.input} numberInput`}
                      {...register('discount')}
                      required
                    />
                  </Grid>
                </Grid>
                <Typography variant="subtitle1" className={classes.title}>
                  5. Attached Gift
                </Typography>
                <input
                  placeholder="Enter Attached Gift"
                  className={classes.input}
                  {...register('attachedGift')}
                  required
                />
                <Grid container spacing={{ xs: 0, md: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      6. Weight (*)
                    </Typography>
                    <input
                      placeholder="Enter Weight"
                      type="number"
                      min={0}
                      className={`${classes.input} numberInput`}
                      {...register('weight')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      7. Number (*)
                    </Typography>
                    <input
                      placeholder="Enter Number"
                      type="number"
                      min={1}
                      className={`${classes.input} numberInput`}
                      {...register('number')}
                      required
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={{ xs: 0, md: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      8. Origin (*)
                    </Typography>
                    <input
                      placeholder="Enter Origin"
                      className={classes.input}
                      {...register('origin')}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                      9. Tax (*)
                    </Typography>
                    <input
                      placeholder="Enter Tax"
                      type="number"
                      min={0}
                      max={100}
                      className={`${classes.input} numberInput`}
                      {...register('tax')}
                      required
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} />
              <Grid item xs={12} md={3} />
              <Grid item xs={12} md={6}>
                <Grid container spacing={{ xs: 0, md: 3 }}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      10. Category Type (*)
                    </Typography>
                    <select className={classes.input} {...register('categoryId')}>
                      <option key={0} value={0} selected disabled hidden>
                        Choose category here
                      </option>
                      {store.categoryList.map((category) => {
                        return (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        );
                      })}
                    </select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" className={classes.title}>
                      11. Supplier (*)
                    </Typography>
                    <select className={classes.input} {...register('supplierId')}>
                      <option key={0} value={0} selected disabled hidden>
                        Choose supplier here
                      </option>
                      {store.supplierList.map((supplier) => {
                        return (
                          <option
                            key={supplier.supplierId}
                            value={supplier.supplierId}
                          >
                            {supplier.supplierName}
                          </option>
                        );
                      })}
                    </select>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" className={classes.title}>
                    12. Date of Manufacture (*)
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField className={classes.date} {...props} />
                      )}
                      {...register('manufacturingDate')}
                    />
                  </LocalizationProvider>
                  <Typography variant="subtitle1" className={classes.title}>
                    13. Expiration Date (*)
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      renderInput={(props) => (
                        <TextField className={classes.date} {...props} />
                      )}
                      {...register('expiryDate')}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" className={classes.title}>
                    14. Image (*)
                  </Typography>
                  <input
                    type="file"
                    className={classes.input}
                    {...register('image')}
                    onChange={handleProductImageChange}
                    required={parseInt(id, 10) === 0}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <img
                      src={
                        productImage === null
                          ? 'https://via.placeholder.com/250'
                          : productImage
                      }
                      alt="productImage"
                      style={{ height: 250, width: 250 }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} md={3} />
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className={classes.title}>
                  15. Short Description (*)
                </Typography>
                <Editor
                  editorStyle={{ border: '1px solid #3c4b64', height: 450 }}
                  editorState={shortDescription}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleShortDescriptionChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className={classes.title}>
                  16. Detail Description (*)
                </Typography>
                <Editor
                  editorStyle={{ border: '1px solid #3c4b64', height: 450 }}
                  editorState={detailDescription}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={handleDetailDescriptionChange}
                />
              </Grid>
              <Grid item xs={12}>
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
                <Button
                  variant="contained"
                  size="large"
                  color="warning"
                  style={{ marginLeft: 10, marginRight: 10, width: 120 }}
                  startIcon={<CancelIcon />}
                  onClick={() => history.push(`/products`)}
                >
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </div>
    </>
  );
}

export default ProductDetail;
