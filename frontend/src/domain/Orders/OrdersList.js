import React from 'react';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import { Box } from '@material-ui/core';
import NoOrdersYet from './NoOrdersYet';

const OrdersList = ({ orders }) => {
  return (
    <>
      {orders.length === 0 ? (
        <NoOrdersYet />
      ) : (
        orders.map((order) => (
          <Box key={order.id} mb={2}>
            <OrderItem order={order} />
          </Box>
        ))
      )}
    </>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrdersList;
