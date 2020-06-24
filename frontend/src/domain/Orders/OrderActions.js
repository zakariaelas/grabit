import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { userRoleSelector } from '../../app/authReducer';
import { ROLES, ORDER_STATUS } from '../../constants';
import { Box, Tooltip, IconButton } from '@material-ui/core';
import { ReactComponent as PickedIcon } from '../../assets/picked.svg';
import { ReactComponent as HomeDeliveryIcon } from '../../assets/home_delivery.svg';
import { changeOrderStatus } from './OrdersActions';

const OrderActions = ({ orderId, status }) => {
  const dispatch = useDispatch();
  const role = useSelector(userRoleSelector);
  if (role !== ROLES.DRIVER) return <></>;

  const getClickHandler = (status) => () => {
    dispatch(changeOrderStatus(orderId, status));
  };

  const getActionsFromStatus = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return (
          <>
            <Box mr={1}>
              <Tooltip title="Mark as picked" placement="left">
                <IconButton
                  color="secondary"
                  onClick={getClickHandler(ORDER_STATUS.PICKED)}
                  size="medium"
                >
                  <PickedIcon className={`MuiSvgIcon-root`} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box>
              <Tooltip title="Mark as delivered" placement="top">
                <IconButton
                  onClick={getClickHandler(ORDER_STATUS.DELIVERED)}
                  size="medium"
                  color="primary"
                >
                  <HomeDeliveryIcon className={`MuiSvgIcon-root`} />
                </IconButton>
              </Tooltip>
            </Box>
          </>
        );
      case ORDER_STATUS.PICKED:
        return (
          <Box>
            <Tooltip title="Mark as delivered" placement="top">
              <IconButton
                onClick={getClickHandler(ORDER_STATUS.DELIVERED)}
                size="medium"
                color="primary"
              >
                <HomeDeliveryIcon className={`MuiSvgIcon-root`} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      default:
        return <></>;
    }
  };

  return <Box display="flex">{getActionsFromStatus(status)}</Box>;
};

OrderActions.propTypes = {
  orderId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default OrderActions;
