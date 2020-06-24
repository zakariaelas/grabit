import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Hidden,
  Tabs,
  Tab,
  Paper,
} from '@material-ui/core';
import BoldButton from '../../components/BoldButton';
import { LocalGroceryStore } from '@material-ui/icons';
import FixedFab from '../../components/FixedFab';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from './OrdersActions';
import {
  isLoadingOrdersSelector,
  activeOrdersSelector,
  deliveredOrdersSelector,
} from './OrdersReducer';
import LoadingSpinner from '../../components/LoadingSpinner';
import OrdersList from './OrdersList';
import TabPanel from '../../components/TabPanel';

//const useStyles = makeStyles((theme) => ({}));

const Orders = (props) => {
  const activeOrders = useSelector(activeOrdersSelector);
  const deliveredOrders = useSelector(deliveredOrdersSelector);
  const isLoading = useSelector(isLoadingOrdersSelector);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box px={2}>
      <Box display="flex" alignItems="center" flexWrap="wrap">
        <Typography variant="h4">My Orders</Typography>
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
        <Paper square>
          <Tabs
            variant="fullWidth"
            value={value}
            indicatorColor="secondary"
            onChange={handleChange}
          >
            <Tab label="Active" />
            <Tab label="Delivered" />
          </Tabs>
        </Paper>
        <Box>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <TabPanel value={value} index={0}>
                <OrdersList orders={activeOrders} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <OrdersList orders={deliveredOrders} />
              </TabPanel>
            </>
          )}
        </Box>
      </Box>
      <Hidden smUp>
        <FixedFab
          component={Link}
          to="/new-order"
          size="medium"
          color="primary"
          aria-label="add"
        >
          <LocalGroceryStore />
        </FixedFab>
      </Hidden>
    </Box>
  );
};

export default Orders;
