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

export const createCouponReducer = (
  state = { createCouponDetails: [] },
  action
) => {
  switch (action.type) {
    case CREATE_COUPON_REQUESTS:
      return { loading: true, createCouponDetails: [] };
    case CREATE_COUPON_SUCCESS:
      return {
        loading: false,
        createCouponMessage: action.payload.message,
        createCouponError: action.payload.error,
      };
    case CREATE_COUPON_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const listCouponReducer = (
  state = { listCouponDetails: [] },
  action
) => {
  switch (action.type) {
    case LIST_COUPON_REQUESTS:
      return { loading: true, listCouponDetails: [] };
    case LIST_COUPON_SUCCESS:
      return {
        loading: false,
        listCoupon: action.payload.listCoupon,
      };
    case LIST_COUPON_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const deleteCouponReducer = (
  state = { deleteCouponDetails: [] },
  action
) => {
  switch (action.type) {
    case DELETE_COUPON_REQUESTS:
      return { loading: true, deleteCouponDetails: [] };
    case DELETE_COUPON_SUCCESS:
      return {
        loading: false,
        deleteCouponMessage: action.payload.message,
        deleteCouponError: action.payload.error,
      };
    case DELETE_COUPON_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const applyCouponReducer = (
  state = { applyCouponDetails: [] },
  action
) => {
  switch (action.type) {
    case APPLY_COUPON_REQUESTS:
      return { loading: true, applyCouponDetails: [] };
    case APPLY_COUPON_SUCCESS:
      return {
        loading: false,
        applyCouponMessage: action.payload.message,
        applyCouponError: action.payload.error,
        totalAfterDiscount: action.payload.totalAfterDiscount,
      };
    case APPLY_COUPON_FAIL:
      return { loading: false, applyCouponError: action.payload.error };
    default:
      return state;
  }
};
