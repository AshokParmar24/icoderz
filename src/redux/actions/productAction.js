import {
  CLEAR_ALL_PRODUCT_LIST,
  UPDATE_RPODUCT_LIST,
 } from "../contants/productContanst";

export const updateProductList = (data) => ({
  type:UPDATE_RPODUCT_LIST ,
  payload: data,
});

export const clearProductList = (data) => ({
  type: CLEAR_ALL_PRODUCT_LIST,
});
