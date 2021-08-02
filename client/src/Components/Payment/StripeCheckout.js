import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntentAction } from ".././../Redux/Actions/payment.action";
import { createOrderAction } from "../../Redux/Actions/order.action";
import { Link, useHistory } from "react-router-dom";
import { getCookie } from "../../helper";
import { set } from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StripeCheckout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecretCode, setClientSecretCode] = useState("");
  const [customerName, setcustomerName] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const authToken = getCookie("token");

  console.log(authToken);

  useEffect(() => {
    dispatch(createPaymentIntentAction(authToken));
  }, [dispatch]);

  const { clientSecret, cartTotal, totalAfterDiscount } = useSelector(
    (state) => state.createPaymentIntent
  );

  useEffect(() => {
    if (clientSecret) {
      setClientSecretCode(clientSecret);
    }
  }, [clientSecret]);

  const options = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: customerName,
        },
      },
    });

    if (payload.error) {
      setError(`payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      dispatch(createOrderAction(payload, authToken));

      if (typeof window !== "undefined") localStorage.removeItem("cart");

      dispatch({ type: "ADD_TO_CART", payload: [] });

      console.log(JSON.stringify(payload, null, 4));

      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const { orderMessage, orderError } = useSelector(
    (state) => state.createOrder
  );

  useEffect(() => {
    toast.success(orderMessage);
    toast.error(orderError);
  }, [orderMessage, orderError]);

  return (
    <>
      <ToastContainer />
      {
        <p className={succeeded ? "result-message" : "result-message-hidden"}>
          Payment Sucessfull
          <Link to="/history">&nbsp; see it in purchase history</Link>
        </p>
      }
      <div className={totalAfterDiscount ? "couponApplied" : "noCoupon"}>
        {totalAfterDiscount ? (
          <p>coupon code applied</p>
        ) : (
          <p>No coupon code applied</p>
        )}
      </div>
      <div className="payment-info">
        <p>
          <i class="fas fa-rupee-sign"></i> {cartTotal}
        </p>
        <p>
          <i class="fas fa-rupee-sign"></i> {totalAfterDiscount}
        </p>
      </div>
      <form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="card-element"
          value={customerName}
          onChange={(e) => {
            setcustomerName(e.target.value);
          }}
        />
        <CardElement
          id="card-element"
          onChange={handleChange}
          options={options}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
      </form>
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default StripeCheckout;
