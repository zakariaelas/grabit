import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { makeStyles } from '@material-ui/core';

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
}));

const FacebookAuth = (props) => {
  const classes = useStyles();
  return (
    <FacebookLogin
      appId="1180182728983653"
      cssClass={`MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-fullWidth ${classes.fbLogin}`}
      {...props}
    />
  );
};

export default FacebookAuth;
