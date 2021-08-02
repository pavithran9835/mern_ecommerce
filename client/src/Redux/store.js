import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productCreateReducer,
  productDeleteReducer,
  getSingleProductReducer,
  UpdateProductReducer,
  getProductListReducer,
  getBestSellerReducer,
  getProductCountReducer,
  setProductsStar,
  getRelatedProducts,
  getSearchFilterProducts,
} from "./Reducers/product.reducer";
import {
  categoryListReducer,
  updateReducer,
} from "./Reducers/category.reducer";
import { singleCategoryReducer } from "./Reducers/category.reducer";
import {
  createCategoryReducer,
  deleteReducer,
  childCategoryReducer,
} from "./Reducers/category.reducer";
import {
  subcategoryListReducer,
  subsingleCategoryReducer,
  subcreateCategoryReducer,
  subdeleteReducer,
  subupdateReducer,
} from "./Reducers/subCategory.reducer";
import {
  getAllUserReducer,
  userCreateReducer,
  userDeleteReducer,
  getSingleUserReducer,
  userUpdateReducer,
  userAddressUpdateReducer,
} from "./Reducers/user.reducer";
import { loginReducer, registerReducer } from "./Reducers/auth.reducer";
import {
  cartReducer,
  getUserCartReducer,
  emptyUserCartReducer,
} from "../Redux/Reducers/cart.reducer";

import {
  createCouponReducer,
  listCouponReducer,
  deleteCouponReducer,
  applyCouponReducer,
} from "../Redux/Reducers/coupon.reducer";
import { createPaymentIntentReducer } from "../Redux/Reducers/payment.reducer";
import {
  getMyOrderReducer,
  createOrderReducer,
} from "../Redux/Reducers/order.reducer";

const reducer = combineReducers({
  createOrder: createOrderReducer,
  getMyOrder: getMyOrderReducer,
  createPaymentIntent: createPaymentIntentReducer,
  applyCoupon: applyCouponReducer,
  deleteCoupon: deleteCouponReducer,
  listCoupon: listCouponReducer,
  createCoupon: createCouponReducer,
  userAddress: userAddressUpdateReducer,
  emptyUserCart: emptyUserCartReducer,
  getUserCart: getUserCartReducer,
  cart: cartReducer,
  SearchFilterProducts: getSearchFilterProducts,
  RelatedProducts: getRelatedProducts,
  productsStar: setProductsStar,
  register: registerReducer,
  login: loginReducer,
  getProductCount: getProductCountReducer,
  getBestSeller: getBestSellerReducer,
  getProductList: getProductListReducer,
  updateProduct: UpdateProductReducer,
  updateUser: userUpdateReducer,
  getSingleUser: getSingleUserReducer,
  deleteUser: userDeleteReducer,
  createUser: userCreateReducer,
  getAllUser: getAllUserReducer,
  getSingleProduct: getSingleProductReducer,
  deleteProducts: productDeleteReducer,
  createProducts: productCreateReducer,
  products: productListReducer,
  allCategory: categoryListReducer,
  singleCategory: singleCategoryReducer,
  createCategory: createCategoryReducer,
  deleteCategory: deleteReducer,
  updateCategory: updateReducer,
  allSubCategory: subcategoryListReducer,
  singleSubCategory: subsingleCategoryReducer,
  createSubCategory: subcreateCategoryReducer,
  deleteSubCategory: subdeleteReducer,
  updateSubCategory: subupdateReducer,
  getChildCategory: childCategoryReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
