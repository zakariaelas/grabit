import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  Divider,
  Tooltip,
  Fab,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import DriverStatusSwitch from '../DriverStatusSwitch/DriverStatusSwitch';
import {
  Navigation,
  LocalGroceryStore,
  Storefront,
  Person,
  Help,
} from '@material-ui/icons';
import { userRoleSelector } from '../../app/authReducer';
import { useSelector } from 'react-redux';
import { ROLES } from '../../constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
  listItem: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  listItemText: {
    fontWeight: 500,
  },
  icon: {
    minWidth: 32,
    color: theme.palette.secondary.dark,
  },
}));

const NavigationRail = (props) => {
  const classes = useStyles();

  const role = useSelector(userRoleSelector);

  return (
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
          {role === ROLES.DRIVER ? (
            <Tooltip placement="right" title="Navigation">
              <Fab
                component={Link}
                to="/navigation"
                color="primary"
                size="medium"
                aria-label="add"
              >
                <Navigation />
              </Fab>
            </Tooltip>
          ) : (
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
          )}
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
  );
};

NavigationRail.propTypes = {};

export default NavigationRail;
