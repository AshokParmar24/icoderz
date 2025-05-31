import { REMOVE_TOKEN, STORE_TOKEN } from "../contants/authContants";

const initialState = {
  token: null,
  isAuthenticated: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case STORE_TOKEN:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };
    case REMOVE_TOKEN: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
}
