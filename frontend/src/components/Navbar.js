import React, { useState, useEffect } from 'react';
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
  Badge,
  Tooltip,
} from '@material-ui/core';
import { ReactComponent as Logo } from '../assets/logo-red-white-horiz.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  userImageSelector,
  displayNameSelector,
  userRoleSelector,
  userIdSelector,
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
  Notifications,
} from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import AvatarOrInitials from './AvatarOrInitials';
import DriverStatusSwitch from '../domain/DriverStatusSwitch/DriverStatusSwitch';
import { ROLES } from '../constants';
import { notify } from '../realtime/notifications';
import { ReactComponent as EmptySvg } from '../assets/empty.svg';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
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
    marginTop: 64,
  },
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemText: {
    fontWeight: 500,
  },
  emptySvg: {
    width: 180,
    height: 180,
  },
  noOutline: {
    outline: 0,
  },
  drawerOpen: {
    width: '200px',
  },
}));

const Navbar = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const imageUrl = useSelector(userImageSelector);
  const displayName = useSelector(displayNameSelector);
  const role = useSelector(userRoleSelector);
  const userId = useSelector(userIdSelector);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = notify(userId, (msg) => {
      console.log(msg);
      setCount((count) => count + 1);
      setNotifications((notifications) => [msg, ...notifications]);
    });
    return unsubscribe;
  }, []);
  const handleClick = (ev) => {
    setCount(0);
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
              onClick={() => setOpen(true)}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden smDown>
            <Box component={Link} to="/">
              <Logo className={classes.logo} />
            </Box>
          </Hidden>
          <Hidden smUp>
            <Typography variant="h2" className={classes.titleLogo}>
              Grabit
            </Typography>
          </Hidden>
          <div className={classes.title}></div>
          <Box>
            <Tooltip title="Notifications" placement="bottom">
              <IconButton
                onClick={handleClick}
                size="medium"
                color="inherit"
              >
                <Badge badgeContent={count} color="primary">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>
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
              {notifications.length === 0 ? (
                <Box
                  className={classes.noOutline}
                  px={8}
                  py={2}
                  display="flex"
                  flexDirection="column"
                  alignContent="center"
                  justifyContent="center"
                >
                  <EmptySvg className={classes.emptySvg} />
                  <Typography align="center" variant="h5">
                    No notifications
                  </Typography>
                </Box>
              ) : (
                notifications.map((notif) => (
                  <MenuItem
                    key={notif.orderId}
                    component={Link}
                    to={`orders/${notif.orderId}/`}
                  >
                    <ListItemText
                      primary={notif.message}
                      secondary={`From ${notif.pickup.address} to ${notif.destination.address}`}
                    />
                  </MenuItem>
                ))
              )}
            </Menu>
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
      <Box display="flex">
        <Hidden smUp>
          <Drawer
            classes={{ paper: classes.drawerOpen }}
            open={open}
            onClose={() => setOpen(false)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            variant="temporary"
          >
            <List>
              <ListItem button component={Link} to="/profile">
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" mb={2}>
                    <Box mr={2}>
                      <AvatarOrInitials
                        imageUrl={imageUrl}
                        displayName={displayName}
                      />
                    </Box>
                  </Box>
                  <ListItemText
                    primary={displayName}
                    primaryTypographyProps={{
                      variant: 'body1',
                      className: classes.bold,
                    }}
                  />
                </Box>
              </ListItem>
              {role === ROLES.DRIVER && (
                <>
                  <ListItem>
                    <DriverStatusSwitch
                      variant="inline"
                      color="primary"
                    />
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem button component={Link} to="/orders">
                <ListItemIcon>
                  <Storefront className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={'My Orders'}
                  primaryTypographyProps={{
                    variant: 'body1',
                    className: classes.listItemText,
                  }}
                />
              </ListItem>
              <ListItem button component={Link} to="/faq">
                <ListItemIcon>
                  <Help className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={'FAQ'}
                  primaryTypographyProps={{
                    variant: 'body1',
                    className: classes.listItemText,
                  }}
                />
              </ListItem>
              <ListItem button component={Link} to="/logout">
                <ListItemIcon>
                  <ExitToApp className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  primary={'Logout'}
                  primaryTypographyProps={{
                    variant: 'body1',
                    className: classes.listItemText,
                  }}
                />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
        <Hidden smDown>
          <Drawer
            classes={{ paper: classes.drawer }}
            variant="permanent"
            className={classes.drawer}
          >
            <div className={classes.toolbar}></div>
            <List>
              {role === ROLES.DRIVER && (
                <>
                  <ListItem className={classes.listItem}>
                    <DriverStatusSwitch />
                  </ListItem>
                  <Divider />
                </>
              )}
              <ListItem className={classes.listItem}>
                <Tooltip placement="right" title="New order">
                  <Fab
                    component={Link}
                    to="/new-order"
                    color="primary"
                    size="medium"
                    aria-label="add"
                  >
                    <LocalGroceryStore />
                  </Fab>
                </Tooltip>
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
        </Hidden>
        <main className={classes.content}>
          <Hidden smDown>
            <Box>
              <Container maxWidth="lg">{children}</Container>
            </Box>
          </Hidden>
          <Hidden smUp>{children}</Hidden>
        </main>
      </Box>
    </Box>
  );
};

export default Navbar;
