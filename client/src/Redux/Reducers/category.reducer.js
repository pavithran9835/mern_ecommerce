import {
  CATEGORY_LIST_REQUESTS,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  // CATEGORY_READ_REQUESTS,
  CATEGORY_READ_SUCCESS,
  CATEGORY_READ_FAIL,
  // CATEGORY_CREATE_REQUESTS,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  GET_CHILD_CATEGORY_SUCCESS,
  GET_CHILD_CATEGORY_FAIL,
} from "../Constants/categoryConstant";

export const categoryListReducer = (state = { categorys: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUESTS:
      return { loading: true, categorys: [] };

    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categorys: action.payload.categorys };

    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const singleCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_READ_SUCCESS:
      return {
        loading: false,
        category: action.payload.category,
        productCategory: action.payload.productCategory,
      };

    case CATEGORY_READ_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createCategoryReducer = (state = { newCategory: {} }, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };

    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export const deleteReducer = (state = { deletecategory: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, deleteMessage: action.payload.message };

    case CATEGORY_DELETE_FAIL:
      return { loading: false, deleteError: action.payload.error };

    default:
      return state;
  }
};

export const updateReducer = (state = { updateCategory: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, updateMessage: action.payload.message };

    case CATEGORY_UPDATE_FAIL:
      return { loading: false, updateError: action.payload.error };

    default:
      return state;
  }
};

export const childCategoryReducer = (state = { childCategory: [] }, action) => {
  switch (action.type) {
    case GET_CHILD_CATEGORY_SUCCESS:
      return { loading: false, childCategory: action.payload.childCategory };

    case GET_CHILD_CATEGORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
