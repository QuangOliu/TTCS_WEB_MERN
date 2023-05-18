import axiosClient from "./axiosClient";

const userApi = {
  getUserById(id) {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },
  getListUsers(uniqueUserIds) {
    const url = "/user/list-user";
    return axiosClient.post(url, { uniqueUserIds });
  },
  getAllUser() {
    const url = "/user";
    return axiosClient.get(url);
  },
};

export default userApi;
