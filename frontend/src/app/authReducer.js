import {
  AUTH_USER_REQUEST,
  AUTH_USER_SUCCESS,
  AUTH_USER_FAILURE,
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
    default:
      return state;
  }
};

export const authSelector = (state) => state.auth;
export const currentUserSelector = (state) => state.auth.currentUser;
