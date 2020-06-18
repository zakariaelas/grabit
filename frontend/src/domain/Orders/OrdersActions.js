import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
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
            error: {
              message: 'An error occurred, please try again later !',
            },
          };
      dispatch({
        type: FETCH_ORDERS_FAILURE,
        payload: error,
      });
    }
  };
}
