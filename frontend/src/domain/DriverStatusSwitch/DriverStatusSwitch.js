import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
  driverStatusSelector,
  userIdSelector,
} from '../../app/authReducer';
import { isLoadingDriverStatusSelector } from './DriverStatusReducer';
import { changeDriverStatus } from './DriverStatusActions';

const DriverStatusSwitch = (props) => {
  const active = useSelector(driverStatusSelector);
  const isLoading = useSelector(isLoadingDriverStatusSelector);
  const uid = useSelector(userIdSelector);
  const dispatch = useDispatch();

  const toggleChecked = () => {
    dispatch(changeDriverStatus(uid, !active));
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            disabled={isLoading}
            checked={active}
            onChange={toggleChecked}
          />
        }
        label={active ? 'Active' : 'Inactive'}
      />
    </FormGroup>
  );
};

export default DriverStatusSwitch;
