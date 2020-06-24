import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  GET_NAVIGATION_FAILURE,
  GET_NAVIGATION_REQUEST,
  GET_NAVIGATION_SUCCESS,
} from '../../app/actionTypes';
import snackbar from '../../components/Snackbar';

export function getRoutes() {
  return async function (dispatch) {
    dispatch({ type: GET_NAVIGATION_REQUEST });
    try {
      const response = await apiCall({
        method: 'GET',
        url: `${apiprefix}/orders/route`,
      });
      dispatch({
        type: GET_NAVIGATION_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            message: 'An error occurred, please try again later !',
          };
      dispatch({
        type: GET_NAVIGATION_FAILURE,
        payload: error,
      });
      snackbar.error(error.message);
    }
  };
}
