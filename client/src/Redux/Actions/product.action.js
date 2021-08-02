import {
  ALL_PRODUCTS_REQUESTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_CREATE_REQUESTS,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_DELETE_REQUESTS,
  PRODUCTS_SINGLE_REQUESTS,
  PRODUCTS_SINGLE_SUCCESS,
  PRODUCTS_SINGLE_FAIL,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_REQUESTS,
  PRODUCTS_LIST_REQUESTS,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_BESTSELLER_REQUESTS,
  PRODUCTS_BESTSELLER_SUCCESS,
  PRODUCTS_BESTSELLER_FAIL,
  PRODUCTS_COUNT_REQUESTS,
  PRODUCTS_COUNT_SUCCESS,
  PRODUCTS_COUNT_FAIL,
  PRODUCTS_STAR_REQUESTS,
  PRODUCTS_STAR_SUCCESS,
  PRODUCTS_STAR_FAIL,
  RELATED_PRODUCTS_REQUESTS,
  RELATED_PRODUCTS_SUCCESS,
  RELATED_PRODUCTS_FAIL,
  PRODUCTS_SEARCH_FILTER_REQUESTS,
  PRODUCTS_SEARCH_FILTER_SUCCESS,
  PRODUCTS_SEARCH_FILTER_FAIL,
  // CREATE_CART_REQUEST,
  // CREATE_CART_SUCCESS,
  // CREATE_CART_FAIL,
} from "../Constants/productConstant";
import {
  CREATE_CART_REQUEST,
  CREATE_CART_SUCCESS,
  CREATE_CART_FAIL,
  GET_USER_CART_REQUEST,
  GET_USER_CART_SUCCESS,
  GET_USER_CART_FAIL,
  EMPTY_USER_CART_REQUEST,
  EMPTY_USER_CART_SUCCESS,
  EMPTY_USER_CART_FAIL,
} from "../Constants/cartConstant";
import axios from "axios";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/product/getAllProduct`
    );

    dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createProducts = (productData) => async (dispatch) => {
  try {
    console.log(productData);

    dispatch({ type: PRODUCTS_CREATE_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/product/createProduct`,
      {
        title: productData.title,
        price: productData.price,
        description: productData.description,
        category: productData.category,
        subCategory: productData.subCategory,
        quantity: productData.quantity,
        color: productData.color,
        brand: productData.brand,
        sold: productData.sold,
        images: productData.images,
      }
    );

    dispatch({
      type: PRODUCTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_CREATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const deleteProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_DELETE_REQUESTS });

    console.log(id);

    const { data } = await axios.get(
      `http://localhost:5000/product/deleteProduct/${id}`
    );

    console.log(data);

    dispatch({
      type: PRODUCTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getSingleProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_SINGLE_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/product/getProductById/${id}`
    );

    dispatch({
      type: PRODUCTS_SINGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_SINGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateProduct = (updateData, id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_UPDATE_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/product/updateProduct/${id}`,
      {
        title: updateData.title,
        price: updateData.price,
        description: updateData.description,
        category: updateData.category,
        subCategory: updateData.subCategory,
        quantity: updateData.quantity,
        color: updateData.color,
        brand: updateData.brand,
        sold: updateData.sold,
        images: updateData.images,
      }
    );
    dispatch({
      type: PRODUCTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_UPDATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getProductsList = (sort, order, limit) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_LIST_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/product/getProductList`,
      {
        sort: sort,
        order: order,
        limit: limit,
      }
    );

    dispatch({
      type: PRODUCTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getBestSellerList = (sort, order, limit) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_BESTSELLER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/product/getProductList`,
      {
        sort: sort,
        order: order,
        limit: limit,
      }
    );

    dispatch({
      type: PRODUCTS_BESTSELLER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_BESTSELLER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const getProductsCount = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_COUNT_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/product/getProductsCount`
    );

    dispatch({
      type: PRODUCTS_COUNT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_COUNT_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const setProductsStar = (productId, newRating, authToken) => async (
  dispatch
) => {
  try {
    dispatch({ type: PRODUCTS_STAR_REQUESTS });

    const { data } = await axios.put(
      `http://localhost:5000/product/getProductsStar/${productId}`,
      { star: newRating },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: PRODUCTS_STAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_STAR_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getRelatedProducts = (id, authToken) => async (dispatch) => {
  try {
    dispatch({ type: RELATED_PRODUCTS_REQUESTS });

    const { data } = await axios.get(
      `http://localhost:5000/product/getRelatedProducts/${id}`,
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: RELATED_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RELATED_PRODUCTS_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getSearchFilterProducts = (query, price) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCTS_SEARCH_FILTER_REQUESTS });

    const { data } = await axios.post(
      `http://localhost:5000/product/search/filters`,
      {
        query: query,
        price: price,
      }
    );

    dispatch({
      type: PRODUCTS_SEARCH_FILTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_SEARCH_FILTER_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const createCart = (cart, authToken) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CART_REQUEST });

    const { data } = await axios.post(
      `http://localhost:5000/cart/create/`,
      { cart: cart },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      }
    );

    dispatch({
      type: CREATE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CART_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getUserCart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_CART_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/cart/getCart`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    dispatch({
      type: GET_USER_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_CART_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const emptyUserCart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: EMPTY_USER_CART_REQUEST });

    const { data } = await axios.get(`http://localhost:5000/cart/emptyCart`, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    dispatch({
      type: EMPTY_USER_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPTY_USER_CART_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};
