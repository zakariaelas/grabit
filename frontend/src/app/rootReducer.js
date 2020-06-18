import { combineReducers } from 'redux';
import { auth } from './authReducer';
import { orders } from '../domain/Orders/OrdersReducer';
import { driverStatus } from '../domain/DriverStatusSwitch/DriverStatusReducer';

const rootReducer = combineReducers({
  auth,
  orders,
  driverStatus,
});

export default rootReducer;
