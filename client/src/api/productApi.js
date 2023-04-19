import axiosClient from "./axiosClient";

const productApi = {
  getAllProduct() {
    const url = "product";
    return axiosClient.get(url);
  },
  getProductById(data) {
    const url = `/product/${data}`;
    // console.log(url);
    return axiosClient.get(url);
  },
};

export default productApi;
