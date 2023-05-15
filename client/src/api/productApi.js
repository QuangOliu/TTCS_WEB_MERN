import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct() {
    const url = "product";
    return axiosClient.get(url);
  },
  getListItem(data) {
    const url = "/product/list-item";
    return axiosClient.post(url, data);
  },
  getProductById(data) {
    const url = `/product/${data}`;
    return axiosClient.get(url);
  },
  createProduct(data) {
    const url = `/product`;
    return axiosClient.post(url, data);
  },
  updateQuantityProduct(data) {
    const url = `/product/update-quantity`;
    return axiosClient.patch(url, data);
  },
  updateProduct(url, data) {
    const path = `/product/${url}`;
    return axiosClient.patch(path, data);
  },
  deleteProducts(data) {
    const url = "/product/deletemany";
    return axiosClient.delete(url, { data });
  },
  deleteProductById(data) {
    const url = `/product/${data}`;
    return axiosClient.delete(url);
  },
};

export default productApi;
