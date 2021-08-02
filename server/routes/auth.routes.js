const express = require("express");
const userRouter = express.Router();
const { register, login, deletereq } = require("../controller/auth.controller");
const { authenticateToken } = require("../middleware/auth.middleware");

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/delete").get(authenticateToken, deletereq);

module.exports = userRouter;
