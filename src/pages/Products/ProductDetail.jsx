import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles(() => ({
  root: {
    margin: 30
  },
  title: {
    fontSize: 'larger',
    fontWeight: 'bolder',
    marginTop: 10
  },
  input: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 'larger',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#3c4b64',
    borderRadius: 10,
    '&:focus': {
      outline: 'none'
    }
  },
  date: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 'larger'
  }
}));

function ProductDetail() {
  const classes = useStyles();
  const [shortDescription, setShortDescription] = useState(
    EditorState.createEmpty()
  );
  const [value, setValue] = React.useState(new Date());

  const handleShortDescriptionChange = (e) => {
    setShortDescription(e);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" style={{ fontWeight: 'bolder', textAlign: 'center' }}>
        PRODUCT DETAIL
      </Typography>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Product Code (*)
            </Typography>
            <input
              placeholder="Enter Product Code"
              className={classes.input}
              required
            />
            <Typography variant="h6" className={classes.title}>
              Product Name (*)
            </Typography>
            <input
              placeholder="Enter Product Name"
              className={classes.input}
              required
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Price (*)
                </Typography>
                <input
                  placeholder="Enter Price"
                  type="number"
                  className={classes.input}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Discount (*)
                </Typography>
                <input
                  placeholder="Enter Discount"
                  type="number"
                  className={classes.input}
                  required
                />
              </Grid>
            </Grid>

            <Typography variant="h6" className={classes.title}>
              Attached Gift
            </Typography>
            <input
              placeholder="Enter Attached Gift"
              className={classes.input}
              required
            />
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Weight (*)
                </Typography>
                <input
                  placeholder="Enter Weight"
                  className={classes.input}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Number (*)
                </Typography>
                <input
                  placeholder="Enter Number"
                  className={classes.input}
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Origin (*)
                </Typography>
                <input
                  placeholder="Enter Origin"
                  className={classes.input}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Tax (*)
                </Typography>
                <input placeholder="Enter Tax" className={classes.input} required />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Category Type (*)
                </Typography>
                <select value={10} className={classes.input}>
                  <option value={10}>Quần</option>
                  <option value={20}>Áo</option>
                  <option value={30}>Giày</option>
                  <option value={40}>Dép</option>
                </select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                  Supplier (*)
                </Typography>
                <select value={10} className={classes.input}>
                  <option value={10}>Capgemini</option>
                </select>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Date of Manufacture (*)
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField className={classes.date} {...props} />
                    )}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
                <Typography variant="h6" className={classes.title}>
                  Experiation Date (*)
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    renderInput={(props) => (
                      <TextField className={classes.date} {...props} />
                    )}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.title}>
                  Image (*)
                </Typography>
                <input
                  placeholder="Enter ImageUrl"
                  className={classes.input}
                  required
                />
                <div style={{ textAlign: 'center' }}>
                  <img
                    src="https://picsum.photos/250"
                    alt="imageUrl"
                    style={{ height: 250, width: 250 }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Short Description (*)
            </Typography>
            <Editor
              editorStyle={{ border: '2px solid #3c4b64', height: 450 }}
              editorState={shortDescription}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleShortDescriptionChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Detail Description (*)
            </Typography>
            <Editor
              editorStyle={{ border: '2px solid #3c4b64', height: 450 }}
              // editorState={shortDescription}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              // onEditorStateChange={handleShortDescriptionChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button>SAVE</Button>
            <Button>CANCEL</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ProductDetail;
