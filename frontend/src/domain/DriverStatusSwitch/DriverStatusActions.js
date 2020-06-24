import apiprefix from '../../utils/apiprefix';
import { apiCall } from '../../utils/api';
import {
  CHANGE_DRIVER_STATUS_REQUEST,
  CHANGE_DRIVER_STATUS_SUCCESS,
  CHANGE_DRIVER_STATUS_FAILURE,
} from '../../app/actionTypes';
import snackbar from '../../components/Snackbar';

export function changeDriverStatus(uid, status) {
  return async function (dispatch) {
    dispatch({ type: CHANGE_DRIVER_STATUS_REQUEST });
    try {
      const response = await apiCall({
        method: 'PATCH',
        url: `${apiprefix}/users/${uid}/active`,
        data: {
          active: status,
        },
      });
      localStorage.token = response.data.token;
      dispatch({
        type: CHANGE_DRIVER_STATUS_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      const error = err.response
        ? err.response.data.error
        : {
            message: 'An error occurred, please try again later !',
          };
      dispatch({
        type: CHANGE_DRIVER_STATUS_FAILURE,
        payload: error,
      });
      snackbar.error(error.message);
    }
  };
}
