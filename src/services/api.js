import axiosInstance from "./axios";

export const signInUser = (payload) => {
  return axiosInstance.post("auth/login", payload);
};

export const singUpUser = (payload) => {
  return axiosInstance.post("users", payload);
};

export const getProductList = (payload) => {
  return axiosInstance.get("products", payload);
};

export const productCategory = (payload)=>{
    return axiosInstance.get("products/categories", payload);

}
