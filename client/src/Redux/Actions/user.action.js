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
import axios from "axios";

export const createUser = (userData) => async (dispatch) => {
  try {
    console.log(userData);

    dispatch({ type: USER_CREATE_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/profile/createUser`,
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        isAdmin: userData.isAdmin,
      }
    );
    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LIST_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/profile/getAllUser`
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DELETE_REQUESTS });

    console.log(id);

    const { data } = await axios.get(
      `http://localhost:5000/profile/deleteUser/${id}`
    );

    console.log(data);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getSingleUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_USER_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/profile/getUserById/${id}`
    );

    dispatch({
      type: SINGLE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_USER_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateUser = (updateData, id) => async (dispatch) => {
  console.log(updateData);

  try {
    dispatch({ type: USER_UPDATE_REQUESTS });

    const { data } = await axios.put(
      `http://localhost:5000/profile/updateUser/${id}`,
      {
        name: updateData.name,
        email: updateData.email,
        password: updateData.password,
        isAdmin: updateData.isAdmin,
        role: updateData.role,
      }
    );
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

// export const emptyUserCart = (authToken) => async (dispatch) => {
//   try {
//     dispatch({ type: EMPTY_USER_CART_REQUEST });

//     const { data } = await axios.get(`http://localhost:5000/cart/emptyCart`, {
//       headers: {
//         authorization: `Bearer ${authToken}`,
//       },
//     });

//     dispatch({
//       type: EMPTY_USER_CART_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: EMPTY_USER_CART_FAIL,
//       payload: error.response && error.response.data.message,
//     });
//   }
// };

export const updateUserAddress = (address, authToken) => async (dispatch) => {
  try {
    dispatch({ type: USER_ADDRESS_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/profile/addAddress`,
      { address: address },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: USER_ADDRESS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADDRESS_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};
