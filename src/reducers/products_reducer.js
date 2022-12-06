import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return { ...state, isSidebarOpen: true };
  }
  if (action.type === SIDEBAR_CLOSE) {
    return { ...state, isSidebarOpen: false };
  }
  if (action.type === GET_PRODUCTS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PRODUCTS_ERROR) {
    return { ...state, isLoading: false, isError: true };
  }
  if (action.type === GET_PRODUCTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      products: action.payload,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return { ...state, is_single_Loading: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return { ...state, is_single_Loading: false, is_single_Error: true };
  }
  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      is_single_Loading: false,
      is_single_Error: false,
      singleProduct: action.payload,
    };
  }
};

export default products_reducer;
