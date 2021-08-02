const express = require("express");
const cartRouter = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const {
  create,
  getUserCart,
  emptyUserCart,
} = require("../controller/cart.controller");

cartRouter.route("/create").post(authenticateToken, create);
cartRouter.route("/getCart").get(authenticateToken, getUserCart);
cartRouter.route("/emptyCart").get(authenticateToken, emptyUserCart);

module.exports = cartRouter;
