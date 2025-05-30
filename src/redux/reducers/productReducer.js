import {
  CLEAR_ALL_PRODUCT_LIST,
  UPDATE_RPODUCT_LIST,
} from "../contants/productContanst";

const initialState = {
  productList: [],
};

export default function productReducer(state = initialState, action) {
  console.log("actionactionactionaction", action);
  switch (action.type) {
    case UPDATE_RPODUCT_LIST:
      return { ...state, productList: action.payload };

    case CLEAR_ALL_PRODUCT_LIST:
      return { ...state, productList: [] };
    default:
      return state;
  }
}
