import {
  SUB_CATEGORY_LIST_SUCCESS,
  SUB_CATEGORY_LIST_FAIL,
  SUB_CATEGORY_READ_SUCCESS,
  SUB_CATEGORY_READ_FAIL,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_FAIL,
  SUB_CATEGORY_DELETE_SUCCESS,
  SUB_CATEGORY_DELETE_FAIL,
  SUB_CATEGORY_UPDATE_SUCCESS,
  SUB_CATEGORY_UPDATE_FAIL,
} from "../Constants/subCategory.constant";
import axios from "axios";

export const getAllSubCategory = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/subCategory/getListsubCategory`
    );

    dispatch({
      type: SUB_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_LIST_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const getSingleSubCategory = (slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/subCategory/getSinglesubCategory/${slug}`
    );

    dispatch({
      type: SUB_CATEGORY_READ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_READ_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const createSubCategory = (categoryData) => async (dispatch) => {
  try {
    console.log(categoryData);

    const { data } = await axios.post(
      `http://localhost:5000/subCategory/createsubCategory`,
      {
        name: categoryData.name,
        parent: categoryData.parent,
      }
    );

    dispatch({
      type: SUB_CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_CREATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};

export const deleteSubCategory = (slug) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/subCategory/deletesubCategory/${slug}`
    );

    console.log(data);

    dispatch({
      type: SUB_CATEGORY_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_DELETE_FAIL,
      payload: error.response && error.response.data.message,
    });
  }
};

export const updateSubCategory = (updateData, slug) => async (dispatch) => {
  try {
    console.log(slug);

    const { data } = await axios.put(
      `http://localhost:5000/subCategory/updatesubCategory/${slug}`,
      {
        name: updateData.name,
        parent: updateData.parent,
      }
    );

    dispatch({
      type: SUB_CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUB_CATEGORY_CREATE_FAIL,
      payload: error.response && error.response.data,
    });
  }
};
