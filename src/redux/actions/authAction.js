import { REMOVE_TOKEN, STORE_TOKEN } from "../contants/authContants";

export const storeToken = (token) => ({
  type: STORE_TOKEN,
  payload: token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
