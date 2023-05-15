import axiosClient from "./axiosClient";

const orderApi = {
  addOrder(data) {
    const url = "order";
    return axiosClient.post(url, data);
  },
  getOrders() {
    const url = "order";
    return axiosClient.get(url);
  },
  getOrderById(id) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
  deleteMany(data) {
    const url = "/order/deletemany";
    return axiosClient.delete(url, { data });
  },
  updataStatus(data) {
    const url = "/order/updatestatus";
    return axiosClient.patch(url, { data });
  },
};

export default orderApi;
