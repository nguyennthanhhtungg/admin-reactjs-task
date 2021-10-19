import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TabPanel from '@material-ui/lab/TabPanel';
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { func } from 'prop-types';
import { useSnackbar } from 'notistack';
import Summary from './Summary/Summary';
import CommentListByStatus from './CommentListByStatus/CommentListByStatus';
import axiosInstance from '../../utils/database';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
  tabList: {
    borderWidth: 1,
    borderStyle: 'solid'
  },
  tab: {
    borderRightWidth: 1,
    borderStyle: 'solid',
    fontWeight: 'bolder'
  }
}));

function Comment(props) {
  console.log('Hello Comment');

  const classes = useStyles();
  const { open, handleClose, product } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [tab, setTab] = React.useState('1');
  const [commentList, setCommentList] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCommentStatusChange = (commentId, status) => {
    setCommentList(
      commentList.map((comment) =>
        comment.commentId === commentId ? { ...comment, status } : comment
      )
    );
  };

  useEffect(() => {
    async function loadCommentList() {
      try {
        const res = await axiosInstance.get(
          `/Comments/CommentListWithCustomerByProductIdAndStatus?productId=${product.productId}&status=ALL`
        );

        if (res.status === 200) {
          setCommentList(res.data);
        }
      } catch (err) {
        enqueueSnackbar(err.response.data.Message, { variant: 'error' });
      }
    }

    if (open === true) {
      loadCommentList();
    }
  }, [open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar style={{ backgroundColor: '#3c4b64', color: 'lightgray' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Comment List
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}>
            <Typography variant="h5">
              {`Ratings & Reviews (${commentList.length})`}
            </Typography>
            <Summary commentList={commentList} />
            <Divider style={{ margin: 10 }} />
            <TabContext value={tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  className={classes.tabList}
                >
                  <Tab
                    label={`New (${
                      commentList.filter((comment) => comment.status === 'NEW')
                        .length
                    })`}
                    value="1"
                    className={classes.tab}
                  />
                  <Tab
                    label={`Approved (${
                      commentList.filter((comment) => comment.status === 'APPROVED')
                        .length
                    })`}
                    value="2"
                    className={classes.tab}
                  />
                  <Tab
                    label={`Archived (${
                      commentList.filter((comment) => comment.status === 'ARCHIVED')
                        .length
                    })`}
                    value="3"
                    className={classes.tab}
                  />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ padding: 0 }}>
                <CommentListByStatus
                  commentList={commentList}
                  status="NEW"
                  handleCommentStatusChange={handleCommentStatusChange}
                />
              </TabPanel>
              <TabPanel value="2" style={{ padding: 0 }}>
                <CommentListByStatus
                  commentList={commentList}
                  status="APPROVED"
                  handleCommentStatusChange={handleCommentStatusChange}
                />
              </TabPanel>
              <TabPanel value="3" style={{ padding: 0 }}>
                <CommentListByStatus
                  commentList={commentList}
                  status="ARCHIVED"
                  handleCommentStatusChange={handleCommentStatusChange}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Container>
      </Dialog>
    </div>
  );
}

export default Comment;
