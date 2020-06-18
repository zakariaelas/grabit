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
  IconButton,
  Divider,
  List,
  ListItem,
  Drawer,
  Fab,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  userImageSelector,
  displayNameSelector,
  userRoleSelector,
} from '../app/authReducer';
import {
  ExitToApp,
  Person,
  Store,
  Mail,
  Inbox,
  Storefront,
  Help,
  LocalGroceryStore,
} from '@material-ui/icons';
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
    width: '115px',
    height: 50,
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
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    top: 86,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    width: 100,
    [theme.breakpoints.up('sm')]: {
      width: '100px',
    },
    ...theme.mixins.toolbar,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemText: {
    fontWeight: 500,
  },
}));

const Navbar = ({ children }) => {
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
    <Box display="flex" flexDirection="column">
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
            <IconButton
              color="inherit"
              size="medium"
              to="/logout"
              component={Link}
            >
              <ExitToApp />
            </IconButton>
          </Container>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Drawer
          classes={{ paper: classes.drawer }}
          variant="permanent"
          className={classes.drawer}
        >
          <List>
            <ListItem className={classes.listItem}>
              <DriverStatusSwitch />
            </ListItem>
            <Divider />
            <ListItem className={classes.listItem}>
              <Fab
                component={Link}
                to="/new-order"
                color="primary"
                size="medium"
                aria-label="add"
              >
                <LocalGroceryStore />
              </Fab>
            </ListItem>
            <ListItem
              to="/orders"
              component={Link}
              button
              className={classes.listItem}
            >
              <Storefront className={classes.icon} />
              <ListItemText
                primary={'My Orders'}
                primaryTypographyProps={{
                  variant: 'body2',
                  className: classes.listItemText,
                }}
              />
            </ListItem>
            <ListItem
              to="/profile"
              component={Link}
              button
              className={classes.listItem}
            >
              <Person />
              <ListItemText
                primary={'Profile'}
                primaryTypographyProps={{
                  variant: 'body2',
                  className: classes.listItemText,
                }}
              />
            </ListItem>
            <ListItem
              to="/faq"
              component={Link}
              button
              className={classes.listItem}
            >
              <Help className={classes.icon} />
              <ListItemText
                primary={'FAQ'}
                primaryTypographyProps={{
                  variant: 'body2',
                  className: classes.listItemText,
                }}
              />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>{children}</main>
      </Box>
    </Box>
  );
};

export default Navbar;
