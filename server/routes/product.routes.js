const express = require("express");
const productRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProductReview,
  productList,
  productsCount,
  productStar,
  relatedProducts,
  searchFilters,
} = require("../controller/product.controller");
const {
  authenticateToken,
  userRole,
} = require("../middleware/auth.middleware");

productRouter.route("/createProduct").post(createProduct);

productRouter.route("/getAllProduct").get(getAllProducts);

productRouter.route("/getProductById/:id").get(getProductById);

productRouter.route("/deleteProduct/:id").get(deleteProduct);

productRouter.route("/updateProduct/:id").post(updateProduct);

productRouter.route("/createProductReview/:id").post(createProductReview);

productRouter.route("/getProductList").post(productList);

productRouter.route("/getProductsCount").get(productsCount);

productRouter
  .route("/getProductsStar/:productId")
  .put(authenticateToken, productStar);

productRouter.route("/getRelatedProducts/:id").get(relatedProducts);

productRouter.route("/search/filters").post(searchFilters);

module.exports = productRouter;
