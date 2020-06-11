import React, { useState } from 'react';
import { makeStyles, Button } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/logo-white-horiz.svg';
import LoginDialog from '../Login/LoginDialog';
import { currentUserSelector } from '../../app/authReducer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    textTransform: 'initial',
    fontWeight: 600,
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <LoginDialog open={open} handleClose={handleClose} />
      <div className={classes.nav}>
        <Logo />
        <div style={{ flex: 1 }}></div>
        {currentUser.isAuthenticated ? (
          <Button
            disableElevation
            className={classes.btn}
            color="primary"
            variant="contained"
            component={Link}
            to="/logout"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={handleOpen}
            disableElevation
            className={classes.btn}
            color="primary"
            variant="contained"
          >
            Sign in
          </Button>
        )}
      </div>
    </>
  );
};

export default Nav;
