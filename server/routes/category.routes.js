const express = require("express");
const categoryRouter = express.Router();
const {
  getListCategory,
  createCategory,
  getSingleCategory,
  deleteCategory,
  updateCategory,
  getChildCategory,
  getCategoryName,
  getSubCategoryName,
} = require("../controller/category.controller");
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");

categoryRouter.route("/getListCategory").get(getListCategory);

categoryRouter.route("/createCategory").post(createCategory);

categoryRouter.route("/getSingleCategory/:slug").get(getSingleCategory);

categoryRouter.route("/deleteCategory/:slug").get(deleteCategory);

categoryRouter.route("/updateCategory/:slug").put(updateCategory);

categoryRouter.route("/child/subCategory/:id").get(getChildCategory);

categoryRouter.route("/categoryDetails/:id").get(getCategoryName);

categoryRouter.route("/subCategoryDetails/:id").get(getSubCategoryName);

module.exports = categoryRouter;
