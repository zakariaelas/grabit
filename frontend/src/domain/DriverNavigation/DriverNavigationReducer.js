import {
  GET_NAVIGATION_FAILURE,
  GET_NAVIGATION_REQUEST,
  GET_NAVIGATION_SUCCESS,
} from '../../app/actionTypes';

const initialState = { error: null, isLoading: false, routes: [] };

export const driverNavigation = (state = initialState, action) => {
  switch (action.type) {
    case GET_NAVIGATION_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_NAVIGATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        routes: action.payload.route,
        error: null,
      };
    case GET_NAVIGATION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const isLoadingDriverNavigationSelector = (state) =>
  state.driverNavigation.isLoading;
export const routesSelector = (state) =>
  state.driverNavigation.routes;
