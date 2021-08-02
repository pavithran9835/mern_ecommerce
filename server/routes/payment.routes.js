const express = require("express");
const paymentRouter = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const { createPaymentIntent } = require("../controller/payment.controller");

paymentRouter
  .route("/create-payment-intent")
  .post(authenticateToken, createPaymentIntent);

module.exports = paymentRouter;
