import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { orders } from '../domain/Orders/OrdersReducer';
import { driverStatus } from '../domain/DriverStatusSwitch/DriverStatusReducer';
import { driverNavigation } from '../domain/DriverNavigation/DriverNavigationReducer';
import { singleOrder } from '../domain/OrderDialog/SingleOrderReducer';

const rootReducer = combineReducers({
  auth,
  orders,
  driverStatus,
  driverNavigation,
  singleOrder,
});

export default rootReducer;
