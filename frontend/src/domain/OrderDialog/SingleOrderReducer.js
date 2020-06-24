import {
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../../app/actionTypes';

const initialState = {
  order: {
    from: {},
    destination: {},
    items: [],
    customer: {},
    driver: {},
  },
  error: null,
  isLoading: false,
};

export const singleOrder = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload.order,
        error: null,
      };
    case GET_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const singleOrderSelector = (state) => state.singleOrder.order;
export const isLoadingSingleOrderSelector = (state) =>
  state.singleOrder.isLoading;
