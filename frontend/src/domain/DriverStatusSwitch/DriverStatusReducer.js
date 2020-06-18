import {
  CHANGE_DRIVER_STATUS_REQUEST,
  CHANGE_DRIVER_STATUS_SUCCESS,
  CHANGE_DRIVER_STATUS_FAILURE,
} from '../../app/actionTypes';

const initialState = { error: null, isLoading: false };

export const driverStatus = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DRIVER_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CHANGE_DRIVER_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case CHANGE_DRIVER_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const isLoadingDriverStatusSelector = (state) =>
  state.driverStatus.isLoading;
