const express = require("express");
const whishlistRouter = express.Router();
const { authenticateToken } = require("../middleware/auth.middleware");
const { createWhishlist } = require("../controller/whishlist.controller");

whishlistRouter.route("/create").post(authenticateToken, createWhishlist);

module.exports = whishlistRouter;
