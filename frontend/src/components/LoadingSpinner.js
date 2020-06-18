import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  spinnerContainer: {
    position: 'relative',
    minHeight: '50vh',
    width: '100%',
  },
  spinner: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}));

const LoadingSpinner = ({ ...props }) => {
  const classes = useStyles();
  return (
    <div className={classes.spinnerContainer}>
      <CircularProgress className={classes.spinner} {...props} />
    </div>
  );
};

export default LoadingSpinner;
