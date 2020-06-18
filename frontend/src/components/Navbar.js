import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Container,
  Box,
  Typography,
  Hidden,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  userImageSelector,
  displayNameSelector,
  userRoleSelector,
} from '../app/authReducer';
import { ExitToApp, Person, Store } from '@material-ui/icons';
import AvatarOrInitials from './AvatarOrInitials';
import DriverStatusSwitch from '../domain/DriverStatusSwitch/DriverStatusSwitch';
import { ROLES } from '../constants';

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
  bold: {
    fontWeight: 600,
  },
  icon: {
    minWidth: 32,
    color: theme.palette.secondary.dark,
  },
  avatar: {
    cursor: 'pointer',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const imageUrl = useSelector(userImageSelector);
  const displayName = useSelector(displayNameSelector);
  const role = useSelector(userRoleSelector);

  const handleClick = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <Box display="flex" alignItems="center">
              <Hidden smDown>
                <Box mr={2}>
                  <Typography
                    className={classes.bold}
                    variant="body1"
                  >
                    {displayName}
                  </Typography>
                </Box>
              </Hidden>
              <AvatarOrInitials
                onClick={handleClick}
                displayName={displayName}
                imageUrl={imageUrl}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                {role === ROLES.DRIVER && (
                  <MenuItem>
                    <DriverStatusSwitch />
                  </MenuItem>
                )}
                <MenuItem
                  component={Link}
                  to="/orders"
                  onClick={handleClose}
                >
                  <ListItemIcon className={classes.icon}>
                    <Store fontSize="small" color="inherit" />
                  </ListItemIcon>
                  <ListItemText>My Orders</ListItemText>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  <ListItemIcon className={classes.icon}>
                    <Person fontSize="small" color="inherit" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/logout"
                  onClick={handleClose}
                >
                  <ListItemIcon className={classes.icon}>
                    <ExitToApp fontSize="small" color="inherit" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
