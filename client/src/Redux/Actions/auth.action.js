import {
  REGISTER_REQUESTS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUESTS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../Constants/authConstants";
import axios from "axios";

export const loginUser = (userData) => async (dispatch) => {
  console.log(userData.email);

  try {
    dispatch({ type: LOGIN_REQUESTS });

    const { data } = await axios.post(`http://localhost:5000/user/login`, {
      email: userData.email,
      password: userData.password,
    });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUESTS });

    const { data } = await axios.post(`http://localhost:5000/user/register`, {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
