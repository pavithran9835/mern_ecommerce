import { ADD_TO_CART } from "../Constants/cartConstant";
import {
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAIL,
  EMPTY_USER_CART_REQUEST,
  EMPTY_USER_CART_SUCCESS,
  EMPTY_USER_CART_FAIL,
} from "../Constants/cartConstant";

let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload;
    default:
      return state;
  }
};

export const getUserCartReducer = (state = { userCartDetails: [] }, action) => {
  switch (action.type) {
    case GET_USER_CART_REQUEST:
      return { loading: true, userCartDetails: [] };
    case GET_USER_CART_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        cartTotal: action.payload.cartTotal,
        errorUserCart: action.payload.error,
      };
    case GET_USER_CART_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const emptyUserCartReducer = (state = { emptyuserCart: [] }, action) => {
  switch (action.type) {
    case EMPTY_USER_CART_REQUEST:
      return { loading: true, emptyuserCart: [] };
    case EMPTY_USER_CART_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case EMPTY_USER_CART_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};
