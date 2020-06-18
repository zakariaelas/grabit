import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from '../../app/actionTypes';

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
      };
    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ordersSelector = (state) => state.orders.orders;
export const isLoadingOrdersSelector = (state) =>
  state.orders.isLoading;
