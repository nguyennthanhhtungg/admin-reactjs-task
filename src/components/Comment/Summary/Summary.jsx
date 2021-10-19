import React, { useEffect, useState } from 'react';

import { calculateRatingAverage, getRatingNumberByRating } from 'utils/rating';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30
  },
  ratingGeneralGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function LinearProgressWithLabel(props) {
  const { rating, percentage, number } = props;
  return (
    <Box display="flex" alignItems="center">
      <Box mr={1}>
        <Rating name="read-only" value={rating} size="small" readOnly />
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Box>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ fontWeight: 'bolder' }}
        >
          ({number})
        </Typography>
      </Box>
    </Box>
  );
}

function Summary({ commentList }) {
  console.log('Hello Summary!');

  const classes = useStyles();
  const [ratingAverage, setRatingAverage] = useState(5);

  useEffect(() => {
    const average = calculateRatingAverage(commentList);
    setRatingAverage(average);
  }, [commentList]);

  return (
    <Grid container>
      <Grid item xs={3} className={classes.ratingGeneralGrid}>
        <Typography
          variant="h4"
          style={{ fontWeight: 'bolder' }}
          color="textSecondary"
        >
          {ratingAverage}/5
        </Typography>
        <Rating name="read-only" value={ratingAverage} readOnly precision={0.1} />
      </Grid>
      <Grid item xs={3}>
        <LinearProgressWithLabel
          rating={5}
          percentage={
            (getRatingNumberByRating(commentList, 5) / commentList.length) * 100
          }
          number={getRatingNumberByRating(commentList, 5)}
        />
        <LinearProgressWithLabel
          rating={4}
          percentage={
            (getRatingNumberByRating(commentList, 4) / commentList.length) * 100
          }
          number={getRatingNumberByRating(commentList, 4)}
        />
        <LinearProgressWithLabel
          rating={3}
          percentage={
            (getRatingNumberByRating(commentList, 3) / commentList.length) * 100
          }
          number={getRatingNumberByRating(commentList, 3)}
        />
        <LinearProgressWithLabel
          rating={2}
          percentage={
            (getRatingNumberByRating(commentList, 2) / commentList.length) * 100
          }
          number={getRatingNumberByRating(commentList, 2)}
        />
        <LinearProgressWithLabel
          rating={1}
          percentage={
            (getRatingNumberByRating(commentList, 1) / commentList.length) * 100
          }
          number={getRatingNumberByRating(commentList, 1)}
        />
      </Grid>
    </Grid>
  );
}

export default React.memo(Summary);
