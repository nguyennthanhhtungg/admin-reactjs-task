import React, { useContext, useEffect, useState } from 'react';
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

function CategoryDetail() {
  console.log('Hello CategoryDetail');

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [categoryImage, setCategoryImage] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState(null);
  const { store, dispatch } = useContext(AppContext);

  useEffect(() => {
    async function loadCategory(categoryId) {
      const res = await axiosInstance.get(`/Categories/${categoryId}`);

      if (res.status === 200) {
        setCategory(res.data);
      }
    }
    if (parseInt(id, 10) !== 0) {
      loadCategory(parseInt(id, 10));
    }
  }, [id]);

  const handleCategoryImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCategoryImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const bodyFormData = new FormData();

    bodyFormData.append('categoryId', id);

    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        bodyFormData.append(key, data[key][0]);
      } else {
        bodyFormData.append(key, data[key]);
      }
    });

    if (parseInt(id, 10) === 0) {
      try {
        const res = await axiosInstance.post(`/Categories`, bodyFormData, {
          'Content-Type': 'multipart/form-data'
        });

        if (res.status === 200) {
          enqueueSnackbar('Create category successfullt!', { variant: 'success' });

          dispatch({
            type: 'addNewCategory',
            payload: res.data
          });

          history.push('/categories');
        }
      } catch (err) {
        enqueueSnackbar('Category info is invalid!', { variant: 'error' });
      }
    } else {
      try {
        const res = await axiosInstance.put(`/Categories`, bodyFormData, {
          'Content-Type': 'multipart/form-data'
        });

        if (res.status === 200) {
          enqueueSnackbar('Update category successfully!', { variant: 'success' });

          dispatch({
            type: 'updateCategory',
            payload: res.data
          });

          history.push('/categories');
        }
      } catch (err) {
        enqueueSnackbar('Category info is invalid!', { variant: 'error' });
      }
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await axiosInstance.delete(`/Categories/${id}`);

      dispatch({
        type: 'removeCategory',
        payload: res.data
      });
      enqueueSnackbar('Delete category successfully!', { variant: 'success' });

      history.push('/categories');
    } catch (err) {
      enqueueSnackbar('You can not remove this category!', { variant: 'error' });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {parseInt(id, 10) === 0
            ? 'Create Category | React App'
            : 'Category Detail | React App'}
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
          {parseInt(id, 10) === 0 ? 'CREATE CATEGORY' : 'CATEGORY DETAIL'}
        </Typography>
        {(parseInt(id, 10) === 0 || (parseInt(id, 10) !== 0 && category)) && (
          <Box sx={{ flexGrow: 1, m: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container>
                <Grid item xs={12} md={3} />
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" className={classes.title}>
                    1. Category Name (*)
                  </Typography>
                  <input
                    placeholder="Enter Category Name"
                    defaultValue={category ? category.categoryName : ''}
                    className={classes.input}
                    {...register('categoryName')}
                    required
                  />
                  <Typography variant="subtitle1" className={classes.title}>
                    2. Image (*)
                  </Typography>
                  <input
                    type="file"
                    className={classes.input}
                    {...register('image')}
                    onChange={handleCategoryImageChange}
                    required={parseInt(id, 10) === 0}
                  />
                  <div style={{ textAlign: 'center' }}>
                    {parseInt(id, 10) === 0 && (
                      <img
                        src={
                          categoryImage === null
                            ? 'https://via.placeholder.com/250'
                            : categoryImage
                        }
                        alt="productImage"
                        style={{ height: 250, width: 250 }}
                      />
                    )}
                    {category && parseInt(id, 10) !== 0 && (
                      <img
                        src={
                          categoryImage === null ? category.imageUrl : categoryImage
                        }
                        alt="categoryImage"
                        style={{ height: 250, width: 250 }}
                      />
                    )}
                  </div>
                  <Typography variant="subtitle1" className={classes.title}>
                    3. Active (*)
                  </Typography>
                  <Switch
                    color="primary"
                    defaultChecked={category ? category.active : true}
                    {...register('active')}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: 'flex', justifyContent: 'center' }}
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
                      onClick={handleDeleteCategory}
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
                    onClick={() => history.push(`/categories`)}
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

export default CategoryDetail;
