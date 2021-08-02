import React from "react";
import "./Payment.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../Payment/StripeCheckout";
import "./stripe.css";

const { REACT_APP_REACT_STRIPE_KEY } = process.env;

const promise = loadStripe(`${REACT_APP_REACT_STRIPE_KEY}`);

const Payment = () => {
  return (
    <div className="paymentContainer">
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="paymentElement">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
