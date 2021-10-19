import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Item from '../Item/Item';

const useStyles = makeStyles(() => ({}));

function CommentListByStatus({ commentList, status, handleCommentStatusChange }) {
  console.log('Hello CommentListByStatus');

  const classes = useStyles();
  const [pagination, setPagination] = useState(1);

  return (
    <>
      {commentList.filter((comment) => comment.status === status).length !== 0 ? (
        <>
          {commentList
            .filter((comment) => comment.status === status)
            .map((comment) => {
              return (
                <>
                  <Item
                    key={comment.commentId}
                    comment={comment}
                    status={status}
                    handleCommentStatusChange={handleCommentStatusChange}
                  />
                  <Divider style={{ margin: 5 }} />
                </>
              );
            })}
        </>
      ) : (
        <Typography
          style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bolder' }}
        >
          No Comments
        </Typography>
      )}
    </>
  );
}

export default React.memo(CommentListByStatus);
