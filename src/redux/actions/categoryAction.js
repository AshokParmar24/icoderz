import {
  CLEAR_CATEGORY_LIST,
  UPDATE_CATEGORY_LIST,
} from "../contants/categoryContants";

export const updateCategoty = (data) => ({
  type: UPDATE_CATEGORY_LIST,
  payload: data,
});

export const clearCategory = (data) => ({
  type: CLEAR_CATEGORY_LIST,
});
