import {
  CREATE_COUPON_REQUESTS,
  CREATE_COUPON_SUCCESS,
  CREATE_COUPON_FAIL,
  LIST_COUPON_REQUESTS,
  LIST_COUPON_SUCCESS,
  LIST_COUPON_FAIL,
  DELETE_COUPON_REQUESTS,
  DELETE_COUPON_SUCCESS,
  DELETE_COUPON_FAIL,
  APPLY_COUPON_REQUESTS,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAIL,
} from "../Constants/couponConstant";
import axios from "axios";

export const createCoupon = (authToken, name, discount, expiry) => async (
  dispatch
) => {
  try {
    dispatch({ type: CREATE_COUPON_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/coupon/create`,
      {
        name: name,
        discount: discount,
        expiry: expiry,
      },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: CREATE_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COUPON_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const listCouponAction = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: LIST_COUPON_REQUESTS });

    const { data } = await axios.get(`http://localhost:5000/coupon/list`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    dispatch({
      type: LIST_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_COUPON_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const deleteCouponAction = (authToken, couponId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_COUPON_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/coupon/delete/${couponId}`,
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: DELETE_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COUPON_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const applyCouponAction = (authToken, coupon) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/coupon/applyCoupon`,
      {
        coupon: coupon,
      },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: APPLY_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
