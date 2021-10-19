export function calculateRatingAverage(commentList) {
  let totalRating = 0;
  commentList.forEach((comment) => {
    totalRating += comment.rate;
  });
  const average =
    commentList.length === 0 ? 5 : (totalRating / (commentList.length * 5)) * 5;
  return average.toFixed(1);
}

export function getRatingNumberByRating(commentList, rating) {
  let number = 0;

  commentList.forEach((comment) => {
    if (comment.rate === rating) {
      number += 1;
    }
  });

  return number;
}
