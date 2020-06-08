import React from 'react';
import { CircularProgress, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapped: {
    position: 'relative',
    display: 'inline-block'
  },
  button: {
    width: '100%'
  },
  buttonProgress: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const CircularProgressButton = ({ children, isLoading, ...props }) => {
  const classes = useStyles();
  const classNameProps = props.className || '';
  return (
    <div className={`${classes.wrapped} ${classNameProps}`}>
      <Button disabled={isLoading} {...props} className={`${classes.button}`}>
        {children}
      </Button>
      {isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default CircularProgressButton;
