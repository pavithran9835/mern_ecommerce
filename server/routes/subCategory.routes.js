const express = require("express");
const subCategoryRouter = express.Router();
const {
  getListSubCategory,
  createSubCategory,
  getSingleSubCategory,
  deleteSubCategory,
  updateSubCategory,
} = require("../controller/subCategory.controller");
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");

subCategoryRouter.route("/getListsubCategory").get(getListSubCategory);

subCategoryRouter.route("/createsubCategory").post(createSubCategory);

subCategoryRouter
  .route("/getSinglesubCategory/:slug")
  .get(getSingleSubCategory);

subCategoryRouter.route("/deletesubCategory/:slug").get(deleteSubCategory);

subCategoryRouter.route("/updatesubCategory/:slug").put(updateSubCategory);

module.exports = subCategoryRouter;
