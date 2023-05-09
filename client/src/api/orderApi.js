import axiosClient from "./axiosClient";

const orderApi = {
  addOrder(data){
    const url = "order";
    return axiosClient.post(url, data);
  },
  getOrder(){
    const url = "order";
    return axiosClient.get(url);
  }
};

export default orderApi;
