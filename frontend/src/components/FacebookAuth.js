import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { makeStyles, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  fbLogin: {
    background: '#3b5998',
    color: '#fff',
    borderColor: '#3b5998',
    textTransform: 'initial',
    fontWeight: 600,
    '&:hover': {
      color: '#fff',
      background: '#324b80',
      borderColor: '#324b80',
    },
  },
  wrapped: {
    position: 'relative',
    display: 'inline-block',
  },
  circularProgress: {
    position: 'absolute',
    color: '#3b5998',
    left: '50%',
    top: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const FacebookAuth = ({ isLoading, ...props }) => {
  const classes = useStyles();
  const classNameProps = props.className || '';
  return (
    <div className={`${classes.wrapped} ${classNameProps}`}>
      <FacebookLogin
        isDisabled={isLoading}
        appId="1180182728983653"
        cssClass={`MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-fullWidth ${classes.fbLogin}`}
        {...props}
      />
      {isLoading && (
        <CircularProgress
          size={24}
          className={classes.circularProgress}
        />
      )}
    </div>
  );
};

export default FacebookAuth;
