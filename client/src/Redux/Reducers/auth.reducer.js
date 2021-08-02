import {
  REGISTER_REQUESTS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUESTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../Constants/authConstants";

export const loginReducer = (state = { loginDetails: [] }, action) => {
  switch (action.type) {
    case LOGIN_REQUESTS:
      return { loading: true, loginDetails: [] };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        token: action.payload,
      };
    case LOGIN_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const registerReducer = (state = { registerDetails: [] }, action) => {
  switch (action.type) {
    case REGISTER_REQUESTS:
      return { loading: true, registerDetails: [] };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case REGISTER_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};
