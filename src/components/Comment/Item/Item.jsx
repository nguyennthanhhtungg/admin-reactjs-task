import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Rating from '@material-ui/lab/Rating';
import makeStyles from '@mui/styles/makeStyles';
import parse from 'html-react-parser';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../../utils/database';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#d3e9f3'
  }
}));

function Item({ comment, status, handleCommentStatusChange }) {
  console.log('Item');

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const handleApprovedStatusChange = async () => {
    try {
      const res = await axiosInstance.put(`/Comments`, {
        commentId: comment.commentId,
        status: 'APPROVED'
      });

      if (res.status === 200) {
        handleCommentStatusChange(comment.commentId, 'APPROVED');

        enqueueSnackbar('This comment has just been approved!', {
          variant: 'success'
        });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  const handleArchivedStatusChange = async () => {
    try {
      const res = await axiosInstance.put(`/Comments`, {
        commentId: comment.commentId,
        status: 'ARCHIVED'
      });

      if (res.status === 200) {
        handleCommentStatusChange(comment.commentId, 'ARCHIVED');

        enqueueSnackbar('This comment has just been archived!', {
          variant: 'success'
        });
      }
    } catch (err) {
      enqueueSnackbar(err.response.data.Message, { variant: 'error' });
    }
  };

  return (
    <div className={classes.root}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={comment.avatarUrl} />
        <div style={{ marginLeft: 10, marginRight: 'auto' }}>
          <Typography style={{ fontWeight: 'bolder' }}>
            {comment.customerName}
          </Typography>
          <Rating value={comment.rate} size="small" readOnly />
        </div>
        <Typography style={{ color: 'gray' }}>{comment.createdDate}</Typography>
      </div>
      <div style={{ marginLeft: 10 }}>{parse(comment.review)}</div>
      <div>
        {(status === 'NEW' || status === 'ARCHIVED') && (
          <Button
            style={{ margin: 5 }}
            size="small"
            variant="contained"
            color="success"
            onClick={handleApprovedStatusChange}
          >
            APRROVE
          </Button>
        )}
        {(status === 'NEW' || status === 'APPROVED') && (
          <Button
            style={{ margin: 5 }}
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleArchivedStatusChange}
          >
            ARCHIVE
          </Button>
        )}
      </div>
    </div>
  );
}

export default React.memo(Item);
