import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  CHANGE_ORDER_STATUS_REQUEST,
  CHANGE_ORDER_STATUS_SUCCESS,
  CHANGE_ORDER_STATUS_FAILURE,
} from '../../app/actionTypes';

export function fetchOrders() {
  return async function (dispatch) {
    dispatch({ type: FETCH_ORDERS_REQUEST });
    try {
      const request = await apiCall({
        method: 'GET',
        url: `${apiprefix}/users/orders/`,
      });
      dispatch({
        type: FETCH_ORDERS_SUCCESS,
        payload: request.data,
      });
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            message: 'An error occurred, please try again later !',
          };
      dispatch({
        type: FETCH_ORDERS_FAILURE,
        payload: error,
      });
    }
  };
}

export function changeOrderStatus(id, status) {
  return async function (dispatch) {
    dispatch({ type: CHANGE_ORDER_STATUS_REQUEST, payload: id });
    try {
      const request = await apiCall({
        method: 'PATCH',
        url: `${apiprefix}/orders/${id}/status`,
        data: {
          status,
        },
      });
      dispatch({
        type: CHANGE_ORDER_STATUS_SUCCESS,
        payload: request.data,
      });
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            message: 'An error occurred, please try again later !',
          };
      dispatch({
        type: CHANGE_ORDER_STATUS_FAILURE,
        payload: error,
      });
    }
  };
}
