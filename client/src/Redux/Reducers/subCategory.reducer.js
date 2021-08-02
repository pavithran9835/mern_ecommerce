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

export const subcategoryListReducer = (
  state = { subCategorys: [] },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST_SUCCESS:
      return { loading: false, subCategorys: action.payload.categorys };

    case SUB_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subsingleCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_READ_SUCCESS:
      return { loading: false, category: action.payload.category };

    case SUB_CATEGORY_READ_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subcreateCategoryReducer = (
  state = { newCategory: {} },
  action
) => {
  switch (action.type) {
    case SUB_CATEGORY_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };

    case SUB_CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload.error };

    default:
      return state;
  }
};

export const subdeleteReducer = (state = { deletecategory: {} }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_DELETE_SUCCESS:
      return { loading: false, deleteMessage: action.payload.message };

    case SUB_CATEGORY_DELETE_FAIL:
      return { loading: false, deleteError: action.payload };

    default:
      return state;
  }
};

export const subupdateReducer = (state = { updateCategory: {} }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_UPDATE_SUCCESS:
      return { loading: false, updateMessage: action.payload.message };

    case SUB_CATEGORY_UPDATE_FAIL:
      return { loading: false, updateError: action.payload };

    default:
      return state;
  }
};
