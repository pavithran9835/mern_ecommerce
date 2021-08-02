import {
  ORDER_HISTORY_REQUESTS,
  ORDER_HISTORY_SUCCESS,
  ORDER_HISTORY_FAIL,
  CREATE_ORDER_REQUESTS,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
} from "../Constants/orderConstant";
import axios from "axios";

export const getMyOrderAction = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_HISTORY_REQUESTS });

    const { data } = await axios.get(`http://localhost:5000/order/getMyOrder`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    dispatch({
      type: ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createOrderAction = (stripeResponse, authToken) => async (
  dispatch
) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/order/createOrder`,
      {
        stripeResponse: stripeResponse,
      },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
