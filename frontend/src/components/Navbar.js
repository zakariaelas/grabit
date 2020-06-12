import React, { useMemo, useState } from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Container,
  IconButton,
  Box,
  Avatar,
  Typography,
  Hidden,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { ExitToApp } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '../app/authReducer';

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
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
  },
  bold: {
    fontWeight: 600,
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const currentUser = useSelector(currentUserSelector);

  const handleClick = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatar = useMemo(
    () =>
      currentUser.imageUrl ? (
        <Avatar
          alt={currentUser.displayName}
          src={currentUser.imageUrl}
          className={classes.avatar}
          onClick={handleClick}
        />
      ) : (
        <Avatar onClick={handleClick} className={classes.avatar}>
          {currentUser.displayName
            .split(' ')
            .slice(2)
            .map((word) => word.charAt(0).toUpperCase())
            .join('')}
        </Avatar>
      ),
    [currentUser],
  );

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
                    {currentUser.displayName}
                  </Typography>
                </Box>
              </Hidden>
              {avatar}
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/logout"
                  onClick={handleClose}
                >
                  Logout
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
