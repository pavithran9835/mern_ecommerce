const express = require("express");
const userRouter = express.Router();
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");
const {
  getUserProfile,
  updateUserProfile,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  createUserAdmin,
  updateAddress,
} = require("../controller/user.controller");

userRouter.route("/createUser").post(createUserAdmin);
userRouter.route("/getUserProfile").get(getUserProfile);
userRouter.route("/updateUserProfile").get(updateUserProfile);

userRouter.route("/getAllUser").get(getAllUser);
userRouter.route("/getUserById/:id").get(getUserById);

userRouter.route("/deleteUser/:id").get(deleteUser);

userRouter.route("/updateUser/:id").put(updateUser);

userRouter.route("/addAddress").post(authenticateToken, updateAddress);

module.exports = userRouter;
