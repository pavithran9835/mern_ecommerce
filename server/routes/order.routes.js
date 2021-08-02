const express = require("express");
const orderRouter = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getMyOrder,
  updateOrderToDelivered,
  updateOrderToPaid,
} = require("../controller/order.controller");
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");

orderRouter.route("/createOrder").post(authenticateToken, createOrder);
orderRouter.route("/getOrderById/:id").get(authenticateToken, getOrderById);
orderRouter.route("/getMyOrder").get(authenticateToken, getMyOrder);
orderRouter
  .route("/getAllOrders")
  .get(authenticateToken, userRole, getAllOrders);
orderRouter
  .route("/updateOrderToDelivered/:id")
  .put(authenticateToken, updateOrderToDelivered);

orderRouter
  .route("/updateOrderToPaid/:id")
  .put(authenticateToken, updateOrderToPaid);

module.exports = orderRouter;
