import React, { useState } from 'react';
import {
  Hidden,
  Box,
  Typography,
  makeStyles,
  Button,
  IconButton,
} from '@material-ui/core';
import {
  SportsMotorsports,
  KeyboardArrowRight,
  Person,
  RoomService,
} from '@material-ui/icons';
import SignupCustomer from '../Signup/SignupCustomer/SignupCustomer';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../../app/authReducer';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  btn: {
    textTransform: 'initial',
    fontWeight: 600,
  },
  buttonsBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  registration: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
  },
  registrationBox: {
    border: '2px solid #fff',
    borderRadius: '4px',
    flexBasis: '32%',
  },
  registrationText: {
    display: 'flex',
    marginTop: '.5rem',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
    transition: '.3s all',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const RegistrationPanel = (props) => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector(currentUserSelector);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <SignupCustomer open={open} handleClose={handleClose} />
      <Hidden smDown>
        <Box p={4} className={classes.registration}>
          {isAuthenticated ? (
            <Box p={3.5} className={classes.registrationBox}>
              <RoomService fontSize="large" />
              <div className={classes.registrationText}>
                <Typography variant="h6">Make an order</Typography>
                <Box ml={4} display="flex">
                  <IconButton
                    size="small"
                    component={Link}
                    to="/home"
                    color="primary"
                  >
                    <KeyboardArrowRight
                      className={classes.icon}
                      fontSize="large"
                    />
                  </IconButton>
                </Box>
              </div>
            </Box>
          ) : (
            <>
              <Box p={3.5} mr={4} className={classes.registrationBox}>
                <SportsMotorsports fontSize="large" />
                <div className={classes.registrationText}>
                  <Typography variant="h6">
                    Register as a Driver
                  </Typography>
                  <Box ml={4} display="flex">
                    <KeyboardArrowRight
                      className={classes.icon}
                      fontSize="large"
                    />
                  </Box>
                </div>
              </Box>
              <Box p={3.5} className={classes.registrationBox}>
                <Person fontSize="large" />
                <div className={classes.registrationText}>
                  <Typography variant="h6">
                    Register as a Customer
                  </Typography>
                  <Box ml={4} display="flex">
                    <KeyboardArrowRight
                      onClick={handleOpen}
                      className={classes.icon}
                      fontSize="large"
                    />
                  </Box>
                </div>
              </Box>
            </>
          )}
        </Box>
      </Hidden>
      <Hidden mdUp>
        <Box mt={4} className={classes.buttonsBox}>
          {isAuthenticated ? (
            <Button
              className={classes.btn}
              disableElevation
              variant="outlined"
              color="primary"
              component={Link}
              to="/home"
            >
              Make an order
            </Button>
          ) : (
            <>
              <Box fontStyle="initial" mr={2}>
                <Button
                  className={classes.btn}
                  disableElevation
                  variant="outlined"
                  color="secondary"
                >
                  Drive with us
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={handleOpen}
                  className={classes.btn}
                  disableElevation
                  variant="outlined"
                  color="primary"
                >
                  Sign up
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Hidden>
    </>
  );
};

export default RegistrationPanel;
