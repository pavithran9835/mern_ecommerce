import {
  CREATE_PAYMENT_INTENT_REQUESTS,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
} from "../Constants/paymentConstant";

export const createPaymentIntentReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case CREATE_PAYMENT_INTENT_REQUESTS:
      return { loading: true, users: [] };
    case CREATE_PAYMENT_INTENT_SUCCESS:
      return {
        loading: false,
        clientSecret: action.payload.clientSecret,
        cartTotal: action.payload.cartTotal,
        totalAfterDiscount: action.payload.totalAfterDiscount,
      };
    case CREATE_PAYMENT_INTENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
