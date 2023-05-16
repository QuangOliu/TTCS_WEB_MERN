import axiosClient from "./axiosClient";

const userApi = {
  getUserById(id) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
