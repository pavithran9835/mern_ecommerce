import {
  ALL_PRODUCTS_REQUESTS,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCTS_CREATE_REQUESTS,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_DELETE_REQUESTS,
  PRODUCTS_DELETE_SUCCESS,
  PRODUCTS_DELETE_FAIL,
  PRODUCTS_SINGLE_REQUESTS,
  PRODUCTS_SINGLE_SUCCESS,
  PRODUCTS_SINGLE_FAIL,
  PRODUCTS_UPDATE_SUCCESS,
  PRODUCTS_UPDATE_FAIL,
  PRODUCTS_UPDATE_REQUESTS,
  PRODUCTS_LIST_SUCCESS,
  PRODUCTS_LIST_FAIL,
  PRODUCTS_LIST_REQUESTS,
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
} from "../Constants/productConstant";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUESTS:
      return { loading: true, products: [] };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case ALL_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = { createProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_CREATE_REQUESTS:
      return { loading: true, createProducts: [] };
    case PRODUCTS_CREATE_SUCCESS:
      return {
        loading: false,
        products: action.payload.newProduct,
        message: action.payload.message,
      };
    case PRODUCTS_CREATE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { deleteProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_DELETE_REQUESTS:
      return { loading: true, deleteProducts: [] };
    case PRODUCTS_DELETE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case PRODUCTS_DELETE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getSingleProductReducer = (
  state = { singleProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_SINGLE_REQUESTS:
      return { loading: true, singleProducts: [] };
    case PRODUCTS_SINGLE_SUCCESS:
      return {
        loading: false,
        singleProduct: action.payload.singleProduct,
      };
    case PRODUCTS_SINGLE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const UpdateProductReducer = (
  state = { updateProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_UPDATE_REQUESTS:
      return { loading: true, updateProducts: [] };
    case PRODUCTS_UPDATE_SUCCESS:
      return {
        loading: false,
        message: action.payload.message,
      };
    case PRODUCTS_UPDATE_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getProductListReducer = (
  state = { getProductList: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_LIST_REQUESTS:
      return { loading: true, getProductList: [] };
    case PRODUCTS_LIST_SUCCESS:
      return {
        loading: false,
        productsList: action.payload.productsList,
      };
    case PRODUCTS_LIST_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getBestSellerReducer = (state = { getBestSeller: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_BESTSELLER_REQUESTS:
      return { loading: true, getBestSeller: [] };
    case PRODUCTS_BESTSELLER_SUCCESS:
      return {
        loading: false,
        bestSellerRed: action.payload.productsList,
      };
    case PRODUCTS_BESTSELLER_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getProductCountReducer = (state = { getCount: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_COUNT_REQUESTS:
      return { loading: true, getCount: [] };
    case PRODUCTS_COUNT_SUCCESS:
      return {
        loading: false,
        productCount: action.payload.total,
      };
    case PRODUCTS_COUNT_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const setProductsStar = (state = { setStar: [] }, action) => {
  switch (action.type) {
    case PRODUCTS_STAR_REQUESTS:
      return { loading: true, setStar: [] };
    case PRODUCTS_STAR_SUCCESS:
      return {
        loading: false,
      };
    case PRODUCTS_STAR_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getRelatedProducts = (state = { RelatedProducts: [] }, action) => {
  switch (action.type) {
    case RELATED_PRODUCTS_REQUESTS:
      return { loading: true, RelatedProducts: [] };
    case RELATED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        relatedProducts: action.payload.relatedProducts,
      };
    case RELATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};

export const getSearchFilterProducts = (
  state = { SearchFilterProducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCTS_SEARCH_FILTER_REQUESTS:
      return { loading: true, SearchFilterProducts: [] };
    case PRODUCTS_SEARCH_FILTER_SUCCESS:
      return {
        loading: false,
        searchProducts: action.payload.searchProducts,
        priceFilter: action.payload.priceFilter,
      };
    case PRODUCTS_SEARCH_FILTER_FAIL:
      return { loading: false, error: action.payload.error };
    default:
      return state;
  }
};
