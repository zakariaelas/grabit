import {
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
  CHANGE_DRIVER_STATUS_SUCCESS,
} from './actionTypes';
import jwtDecode from 'jwt-decode';

if (localStorage.token) {
  let jwt = jwtDecode(localStorage.token);
  let current_time = Date.now().valueOf() / 1000;
  if (jwt.exp < current_time) {
    localStorage.removeItem('token');
    window.location.href = `${process.env.PUBLIC_URL}/`;
  }
}

let initialState = localStorage.token
  ? {
      currentUser: {
        isAuthenticated: true,
        ...jwtDecode(localStorage.token),
      },
      isLoading: false,
      error: null,
    }
  : {
      currentUser: { isAuthenticated: false, role: 'learner' },
      isLoading: false,
      error: null,
    };

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: { ...action.payload, isAuthenticated: true },
      };
    case AUTH_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case CHANGE_DRIVER_STATUS_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export const authSelector = (state) => state.auth;
export const currentUserSelector = (state) => state.auth.currentUser;
export const isLoadingAuthSelector = (state) => state.auth.isLoading;
export const userImageSelector = (state) =>
  state.auth.currentUser.imageUrl;
export const displayNameSelector = (state) =>
  state.auth.currentUser.displayName;
export const driverStatusSelector = (state) =>
  state.auth.currentUser.active;
export const userIdSelector = (state) => state.auth.currentUser.id;
export const userRoleSelector = (state) =>
  state.auth.currentUser.role;
