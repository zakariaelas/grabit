import React, { useEffect } from 'react';
import { Box, Typography, Divider, Hidden } from '@material-ui/core';
import BoldButton from '../../components/BoldButton';
import { Add } from '@material-ui/icons';
import FixedFab from '../../components/FixedFab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './OrdersActions';
import {
  ordersSelector,
  isLoadingOrdersSelector,
} from './OrdersReducer';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrdersList from './OrdersList';

//const useStyles = makeStyles((theme) => ({}));

const Orders = (props) => {
  const orders = useSelector(ordersSelector);
  const isLoading = useSelector(isLoadingOrdersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <Box px={2}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h5">My Orders</Typography>
        <Box flexGrow="10" mb={6}></Box>
        <Hidden smDown>
          <BoldButton
            component={Link}
            to="/new-order"
            color="primary"
            variant="contained"
          >
            Request an Order
          </BoldButton>
        </Hidden>
      </Box>
      <Box mt={2} mb={4}>
        <Divider variant="fullWidth" />
      </Box>
      <Box>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <OrdersList orders={orders} />
        )}
      </Box>
      <Hidden smUp>
        <FixedFab
          component={Link}
          to="/new-order"
          size="medium"
          color="primary"
          aria-label="add"
        >
          <Add />
        </FixedFab>
      </Hidden>
    </Box>
  );
};

export default Orders;
