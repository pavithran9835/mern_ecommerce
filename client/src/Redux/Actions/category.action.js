import {
  CATEGORY_LIST_REQUESTS,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAIL,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  GET_CHILD_CATEGORY_SUCCESS,
  GET_CHILD_CATEGORY_FAIL,
} from "../Constants/categoryConstant";
import axios from "axios";

export const getAllCategory = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/category/getListCategory`
    );

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getSingleCategory = (slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/category/getSingleCategory/${slug}`
    );

    dispatch({
      type: CATEGORY_READ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_READ_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createCategory = (categoryName) => async (dispatch) => {
  try {
    console.log(categoryName);

    const { data } = await axios.post(
      `http://localhost:5000/category/createCategory`,
      {
        name: categoryName,
      }
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const deleteCategory = (slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/category/deleteCategory/${slug}`
    );

    console.log(data);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateCategory = (slug, updateCategoryName) => async (
  dispatch
) => {
  try {
    const { data } = await axios.put(
      `http://localhost:5000/category/updateCategory/${slug}`,
      {
        name: updateCategoryName,
      }
    );

    console.log(data);

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getChildCategory = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/category/child/subCategory/${id}`
    );

    dispatch({
      type: GET_CHILD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHILD_CATEGORY_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};
