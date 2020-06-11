import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Container,
  IconButton,
  Box,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: '150px',
    height: 80,
    marginRight: theme.spacing(1),
  },
  appbar: {
    backgroundColor: '#222A30',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar
        position="static"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar>
          <Container className={classes.root} maxWidth="lg">
            <Box component={Link} to="/">
              <Logo className={classes.logo} />
            </Box>
            <div className={classes.title}></div>
            <IconButton color="inherit" component={Link} to="/logout">
              <ExitToApp />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
