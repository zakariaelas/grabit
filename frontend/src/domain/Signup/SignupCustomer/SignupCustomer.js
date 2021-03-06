import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  makeStyles,
  Typography,
  Hidden,
  IconButton,
} from '@material-ui/core';
import { ReactComponent as LogoShape } from '../../../assets/shape.svg';
import { ArrowBack } from '@material-ui/icons';
import SignupCustomerForm from './SignupCustomerForm';
import ResponsiveDialog from '../../../components/ResponsiveDialog';
import { register } from '../SignupActions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { facebookAuth } from '../../Login/LoginActions';
import FacebookAuth from '../../../components/FacebookAuth';
import { isLoadingAuthSelector } from '../../../app/authReducer';

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
  logo: {
    height: '50px',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
  },
}));

const SignupCustomer = ({ open, handleClose }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingAuthSelector);
  return (
    <ResponsiveDialog open={open} onClose={handleClose}>
      <Hidden smUp>
        <Box mt={2} ml={2}>
          <IconButton onClick={handleClose}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Box>
      </Hidden>
      <Box
        pt={4}
        pb={8}
        px={5}
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <LogoShape className={classes.logo} />
        <Box>
          <Typography
            gutterBottom
            className={classes.title}
            variant="h4"
          >
            Welcome to Grabit
          </Typography>
        </Box>
        <SignupCustomerForm
          initialValues={{
            displayName: '',
            email: '',
            password: '',
            confirmationpassword: '',
          }}
          onSubmit={(values) => {
            const req = {
              displayName: values.displayName,
              email: values.email,
              password: values.password,
              role: 'customer',
            };
            dispatch(register(req, history));
          }}
        />
        <Box mt={2}>
          <Typography variant="h6" align="center">
            OR
          </Typography>
        </Box>
        <Box mt={2}>
          <FacebookAuth
            appId="1180182728983653"
            isLoading={isLoading}
            textButton="Continue with Facebook"
            callback={(data) => {
              const req = {
                accessToken: data.accessToken,
                fbId: data.id,
                role: 'customer',
              };
              dispatch(facebookAuth(req, history));
            }}
          />
        </Box>
      </Box>
    </ResponsiveDialog>
  );
};

SignupCustomer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SignupCustomer;
