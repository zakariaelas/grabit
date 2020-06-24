import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  Menu,
  Tooltip,
  IconButton,
  Badge,
  makeStyles,
  Box,
  MenuItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { notify } from '../../realtime/notifications';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useSelector } from 'react-redux';
import { userIdSelector } from '../../app/authReducer';
import { ReactComponent as EmptySvg } from '../../assets/empty.svg';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  emptySvg: {
    width: 180,
    height: 180,
  },
  noOutline: {
    outline: 0,
  },
  listItem: {
    whiteSpace: 'normal',
  },
}));

const Notifications = () => {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const userId = useSelector(userIdSelector);

  useEffect(() => {
    const unsubscribe = notify(userId, (msg) => {
      ReactDOM.unstable_batchedUpdates(() => {
        setCount((count) => count + 1);
        setNotifications((notifications) => [msg, ...notifications]);
      });
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
    <>
      <Tooltip title="Notifications" placement="bottom">
        <IconButton
          onClick={handleClick}
          size="medium"
          color="inherit"
        >
          <Badge badgeContent={count} color="primary">
            <NotificationIcon />
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
                className={classes.listItem}
                primary={notif.message}
                secondary={`From ${notif.pickup.address} to ${notif.destination.address}`}
              />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default Notifications;
