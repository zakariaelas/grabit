import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
} from '../../app/actionTypes';

export function getOrder(oid) {
  return async function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    try {
      const request = await apiCall({
        method: 'GET',
        url: `${apiprefix}/orders/${oid}`,
      });
      dispatch({
        type: GET_ORDER_SUCCESS,
        payload: request.data,
      });
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            message: 'An error occurred, please try again later !',
          };
      dispatch({
        type: GET_ORDER_FAILURE,
        payload: error,
      });
    }
  };
}
