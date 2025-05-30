import { CLEAR_CATEGORY_LIST, UPDATE_CATEGORY_LIST } from "../contants/categoryContants";

const initialState = {
  categoryList: [],
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case CLEAR_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    default:
      return state;
  }
}
