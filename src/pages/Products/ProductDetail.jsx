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
      <Typography
        variant="h4"
        style={{
          fontWeight: 'bolder',
          textAlign: 'center',
          color: 'blue',
          fontFamily: 'Roboto'
        }}
      >
        PRODUCT DETAIL
      </Typography>
      <Box sx={{ flexGrow: 1, m: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} />
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" className={classes.title}>
              1. Product Code (*)
            </Typography>
            <input
              placeholder="Enter Product Code"
              className={classes.input}
              required
            />
            <Typography variant="subtitle1" className={classes.title}>
              2. Product Name (*)
            </Typography>
            <input
              placeholder="Enter Product Name"
              className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                  className={classes.input}
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
                <select value={10} className={classes.input}>
                  <option value={10}>Quần</option>
                  <option value={20}>Áo</option>
                  <option value={30}>Giày</option>
                  <option value={40}>Dép</option>
                </select>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" className={classes.title}>
                  11. Supplier (*)
                </Typography>
                <select value={10} className={classes.input}>
                  <option value={10}>Capgemini</option>
                </select>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className={classes.title}>
                12. Date of Manufacture (*)
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
              <Typography variant="subtitle1" className={classes.title}>
                13. Expiration Date (*)
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
              <Typography variant="subtitle1" className={classes.title}>
                14. Image (*)
              </Typography>
              <input type="file" className={classes.input} required />

              <div style={{ textAlign: 'center' }}>
                <img
                  src="https://picsum.photos/250"
                  alt="imageUrl"
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
