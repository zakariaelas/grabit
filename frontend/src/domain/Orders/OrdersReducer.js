import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_FAILURE,
  CHANGE_ORDER_STATUS_SUCCESS,
} from '../../app/actionTypes';
import { ORDER_STATUS } from '../../constants';
import { createSelector } from 'reselect';

const initialState = { orders: [], error: null, isLoading: false };

export const orders = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        error: null,
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CHANGE_ORDER_STATUS_REQUEST: {
      const index = state.orders.findIndex(
        (order) => order.id === action.payload,
      );
      const newOrders = state.orders.slice();
      newOrders[index] = { ...newOrders[index], isLoading: true };
      return {
        ...state,
        orders: newOrders,
      };
    }
    case CHANGE_ORDER_STATUS_SUCCESS:
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.order.id,
      );
      console.log('states.orders', state.orders);
      console.log(index);
      console.log(action);
      const newOrders = state.orders.slice();
      newOrders[index] = action.payload.order;
      return {
        ...state,
        orders: newOrders,
        isLoading: false,
        error: null,
      };
    case CHANGE_ORDER_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const getActiveOrders = (orders) =>
  orders.filter(
    (order) =>
      order.status === ORDER_STATUS.PENDING ||
      order.status === ORDER_STATUS.PICKED,
  );

const getDeliveredOrders = (orders) =>
  orders.filter((order) => order.status === ORDER_STATUS.DELIVERED);

export const ordersSelector = (state) => state.orders.orders;
export const isLoadingOrdersSelector = (state) =>
  state.orders.isLoading;
export const activeOrdersSelector = createSelector(
  ordersSelector,
  getActiveOrders,
);
export const deliveredOrdersSelector = createSelector(
  ordersSelector,
  getDeliveredOrders,
);
