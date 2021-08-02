import {
  CREATE_PAYMENT_INTENT_REQUESTS,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
} from "../Constants/paymentConstant";
import axios from "axios";

export const createPaymentIntentAction = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PAYMENT_INTENT_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/payment/create-payment-intent`,
      {},
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );
    dispatch({
      type: CREATE_PAYMENT_INTENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PAYMENT_INTENT_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
