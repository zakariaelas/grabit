import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Switch,
  makeStyles,
  ListItemText,
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

const DriverStatusSwitch = ({ variant = 'block', ...props }) => {
  const classes = useStyles();
  const active = useSelector(driverStatusSelector);
  const isLoading = useSelector(isLoadingDriverStatusSelector);
  const uid = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const toggleChecked = () => {
    dispatch(changeDriverStatus(uid, !active));
  };

  let component;
  const mySwitch = (
    <Switch
      {...props}
      disabled={isLoading}
      checked={active}
      onChange={toggleChecked}
    />
  );

  switch (variant) {
    case 'inline':
      component = (
        <FormGroup>
          <FormControlLabel
            control={mySwitch}
            label={active ? 'Active' : 'Inactive'}
          />
        </FormGroup>
      );
    case 'block':
      component = (
        <>
          {mySwitch}
          <ListItemText
            primary={active ? 'Active' : 'Inactive'}
            primaryTypographyProps={{
              variant: 'body1',
              className: classes.listItemText,
            }}
          />
        </>
      );
  }

  return component;
};

export default DriverStatusSwitch;
