import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Box, Divider, makeStyles } from '@material-ui/core';
import LoginForm from './LoginForm';
import FacebookLogin from 'react-facebook-login';

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

const Login = (props) => {
  const classes = useStyles();
  return (
    <Paper>
      <Box p={4}>
        <FacebookLogin
          appId="1180182728983653"
          cssClass={`MuiButtonBase-root MuiButton-root MuiButton-outlined ${classes.fbLogin}`}
          textButton="Continue with Facebook"
          callback={(data) => {
            console.log(data);
            const code = JSON.parse(
              atob(data.signedRequest.split('.')[1]),
            );
            console.log(code);
          }}
        />
        <Box my={2}>
          <Divider />
        </Box>
        <LoginForm
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        />
      </Box>
    </Paper>
  );
};

Login.propTypes = {};

export default Login;
