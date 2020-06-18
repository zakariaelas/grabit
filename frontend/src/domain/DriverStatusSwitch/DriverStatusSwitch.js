import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  driverStatusSelector,
  userIdSelector,
} from '../../app/authReducer';
import { isLoadingDriverStatusSelector } from './DriverStatusReducer';
import { changeDriverStatus } from './DriverStatusActions';

const useStyles = makeStyles((theme) => ({
  listItemText: {
    fontWeight: 500,
  },
}));

const DriverStatusSwitch = (props) => {
  const classes = useStyles();
  const active = useSelector(driverStatusSelector);
  const isLoading = useSelector(isLoadingDriverStatusSelector);
  const uid = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const toggleChecked = () => {
    dispatch(changeDriverStatus(uid, !active));
  };

  return (
    <>
      <Switch
        color="secondary"
        disabled={isLoading}
        checked={active}
        onChange={toggleChecked}
      />
      <ListItemText
        primary={active ? 'Active' : 'Inactive'}
        primaryTypographyProps={{
          variant: 'body2',
          className: classes.listItemText,
        }}
      />
    </>
  );
};

export default DriverStatusSwitch;
