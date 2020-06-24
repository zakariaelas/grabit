import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Box,
  Typography,
  Hidden,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '../Notifications/Notifications';

const useStyles = makeStyles((theme) => ({
  flexGrow: {
    flexGrow: 1,
  },
  titleLogo: {
    fontWeight: 'bold',
    fontFamily: 'Nunito',
    letterSpacing: -2.5,
  },
  logo: {
    width: '115px',
    height: 50,
    marginRight: theme.spacing(1),
  },
  appbar: {
    backgroundColor: '#222A30',
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const GrabitAppBar = ({ handleClick }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <AppBar
        position="fixed"
        elevation={0}
        className={classes.appbar}
      >
        <Toolbar>
          <Hidden smUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h2" className={classes.titleLogo}>
              Grabit
            </Typography>
          </Hidden>
          <Hidden smDown>
            <Box component={Link} to="/">
              <Logo className={classes.logo} />
            </Box>
          </Hidden>
          <div className={classes.flexGrow}></div>
          <Box>
            <Notifications />
            <Hidden smDown>
              <Tooltip title="Logout" placement="bottom">
                <IconButton
                  color="inherit"
                  size="medium"
                  to="/logout"
                  component={Link}
                >
                  <ExitToApp />
                </IconButton>
              </Tooltip>
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GrabitAppBar;
