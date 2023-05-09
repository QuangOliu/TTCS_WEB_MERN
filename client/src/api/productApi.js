import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct() {
    const url = "product";
    return axiosClient.get(url);
  },
  getProductById(data) {
    const url = `/product/${data}`;
    return axiosClient.get(url);
  },
  createProduct(data) {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  deleteProduct(data) {
    const url = `/product`;
    return axiosClient.delete(url, data);
  },
};

export default productApi;
