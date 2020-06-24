import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  Box,
  ListItemText,
  Divider,
  ListItemIcon,
  makeStyles,
} from '@material-ui/core';
import AvatarOrInitials from '../../components/AvatarOrInitials';
import DriverStatusSwitch from '../DriverStatusSwitch/DriverStatusSwitch';
import {
  Storefront,
  Help,
  ExitToApp,
  Navigation,
} from '@material-ui/icons';
import { useSelector } from 'react-redux';
import {
  userImageSelector,
  displayNameSelector,
  userRoleSelector,
} from '../../app/authReducer';
import { ROLES } from '../../constants';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: '200px',
  },
  listItemText: {
    fontWeight: 500,
  },
  icon: {
    minWidth: 32,
    color: theme.palette.secondary.dark,
  },
  bold: {
    fontWeight: 600,
  },
}));

const MobileDrawer = ({ open, handleClose }) => {
  const classes = useStyles();

  const imageUrl = useSelector(userImageSelector);
  const displayName = useSelector(displayNameSelector);
  const role = useSelector(userRoleSelector);

  return (
    <Drawer
      classes={{ paper: classes.drawerOpen }}
      open={open}
      onClose={handleClose}
      ModalProps={{
        keepMounted: true,
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
              <DriverStatusSwitch variant="inline" color="primary" />
            </ListItem>
            <Divider />
            <ListItem button component={Link} to="/navigation">
              <ListItemIcon>
                <Navigation className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                primary={'Navigation'}
                primaryTypographyProps={{
                  variant: 'body1',
                  className: classes.listItemText,
                }}
              />
            </ListItem>
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
  );
};

MobileDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default MobileDrawer;
