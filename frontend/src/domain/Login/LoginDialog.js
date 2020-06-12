import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  makeStyles,
  Typography,
  Hidden,
  IconButton,
} from '@material-ui/core';
import LoginForm from './LoginForm';
import { ReactComponent as LogoShape } from '../../assets/shape.svg';
import { ArrowBack } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, facebookLogin } from './LoginActions';
import { useHistory } from 'react-router-dom';
import ResponsiveDialog from '../../components/ResponsiveDialog';
import FacebookAuth from '../../components/FacebookAuth';
import { isLoadingAuthSelector } from '../../app/authReducer';

const useStyles = makeStyles((theme) => ({
  logo: {
    height: '50px',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: 600,
  },
}));

const LoginDialog = ({ open, handleClose }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector(isLoadingAuthSelector);
  const classes = useStyles();
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
            Welcome back !
          </Typography>
        </Box>
        <LoginForm
          initialValues={{
            email: '',
            password: '',
          }}
          isLoading={isLoading}
          onSubmit={(values) => {
            console.log(values);
            dispatch(login(values, history));
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
              dispatch(facebookLogin(req, history));
            }}
          />
        </Box>
      </Box>
    </ResponsiveDialog>
  );
};

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default LoginDialog;
