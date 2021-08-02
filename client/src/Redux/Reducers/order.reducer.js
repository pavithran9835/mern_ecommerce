import {
  ORDER_HISTORY_REQUESTS,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
  CREATE_ORDER_REQUESTS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../Constants/orderConstant";

export const getMyOrderReducer = (state = { myOrderDetails: [] }, action) => {
  switch (action.type) {
    case ORDER_HISTORY_REQUESTS:
      return { loading: true, myOrderDetails: [] };
    case ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        myOrder: action.payload.myOrder,
      };
    case ORDER_HISTORY_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const createOrderReducer = (
  state = { createOrderDetails: [] },
  action
) => {
  switch (action.type) {
    case CREATE_ORDER_REQUESTS:
      return { loading: true, createOrderDetails: [] };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        orderMessage: action.payload.message,
        orderError: action.payload.error,
      };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};
