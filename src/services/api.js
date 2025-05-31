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

export const productCategory = (payload) => {
  return axiosInstance.get("products/categories", payload);
};

export const createProductApi = (payload) => {
  return axiosInstance.post("products", payload);
};

export const editProuctApi = (id, payload) => {
  return axiosInstance.put(`products/${id}`, payload);
};

export const deleteProuctApi = (id, payload) => {
  return axiosInstance.delete(`products/${id}`, payload);
};

export const getSingalProductApi = (id, payload) => {
  return axiosInstance.get(`products/${id}`, payload);
};
