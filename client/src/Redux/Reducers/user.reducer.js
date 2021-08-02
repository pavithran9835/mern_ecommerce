import {
  USER_LIST_REQUESTS,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_CREATE_REQUESTS,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_DELETE_REQUESTS,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  SINGLE_USER_REQUESTS,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_FAIL,
  USER_UPDATE_REQUESTS,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_ADDRESS_REQUESTS,
  USER_ADDRESS_SUCCESS,
  USER_ADDRESS_FAIL,
} from "../Constants/userConstant";

export const getAllUserReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUESTS:
      return { loading: true, users: [] };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
      };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userCreateReducer = (state = { createUser: [] }, action) => {
  switch (action.type) {
    case USER_CREATE_REQUESTS:
      return { loading: true, createUser: [] };
    case USER_CREATE_SUCCESS:
      return {
        loading: false,
        user: action.payload.newProduct,
        message: action.payload.message,
      };
    case USER_CREATE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = { deleteUser: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUESTS:
      return { loading: true, deleteUser: [] };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        deleteMessage: action.payload.message,
      };
    case USER_DELETE_FAIL:
      return { loading: false, deleteError: action.payload.error };
    default:
      return state;
  }
};

export const getSingleUserReducer = (state = { singleUsers: [] }, action) => {
  switch (action.type) {
    case SINGLE_USER_REQUESTS:
      return { loading: true, singleUsers: [] };
    case SINGLE_USER_SUCCESS:
      return {
        loading: false,
        userById: action.payload.singleUser,
      };
    case SINGLE_USER_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { updateUser: [] }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUESTS:
      return { loading: true, updateUser: [] };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        updateMessage: action.payload.message,
      };
    case USER_UPDATE_FAIL:
      return { loading: false, updateError: action.payload.error };
    default:
      return state;
  }
};

export const userAddressUpdateReducer = (
  state = { updateAddress: [] },
  action
) => {
  switch (action.type) {
    case USER_ADDRESS_REQUESTS:
      return { loading: true, updateAddress: [] };
    case USER_ADDRESS_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case USER_ADDRESS_FAIL:
      return { loading: false, updateError: action.payload.error };
    default:
      return state;
  }
};
