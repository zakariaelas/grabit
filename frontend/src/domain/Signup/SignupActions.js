import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
} from '../../app/actionTypes';
import snackbar from '../../components/Snackbar';

export function register(user, history) {
  return async function (dispatch) {
    dispatch({ type: AUTH_USER_REQUEST });
    try {
      const request = await apiCall({
        method: 'POST',
        url: `${apiprefix}/users`,
        data: user,
      });
      localStorage.token = request.data.token;
      dispatch({
        type: AUTH_USER_SUCCESS,
        payload: request.data,
      });
      history.push('/orders');
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            error: {
              message: 'An error occurred, please try again later !',
            },
          };
      dispatch({
        type: AUTH_USER_FAILURE,
        payload: error,
      });
      snackbar.error(error.message);
    }
  };
}
