const User = require("../model/user.model");
const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const Coupon = require("../model/coupon.model");
const dotenv = require("dotenv");
dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAfterDiscount * 100,
    currency: "inr",
  });

  res
    .status(200)
    .json({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
    });
};
