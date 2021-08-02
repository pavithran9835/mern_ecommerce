const express = require("express");
const couponRouter = express.Router();
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");
const {
  createCoupon,
  listCoupon,
  deleteCoupon,
  applyCoupon,
} = require("../controller/coupon.controller");

couponRouter.route("/create").post(authenticateToken, userRole, createCoupon);
couponRouter.route("/list").get(authenticateToken, userRole, listCoupon);
couponRouter
  .route("/delete/:couponId")
  .get(authenticateToken, userRole, deleteCoupon);
couponRouter.route("/applyCoupon").post(authenticateToken, applyCoupon);

module.exports = couponRouter;
