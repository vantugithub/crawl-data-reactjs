import axios from "axios";
import authHeader from "./auth-header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const API_URL =
  "https://instagram-smart-crawler.herokuapp.com/api/admin-management/";

const getAll = () => {
  return axios.get(API_URL + "users?page=0&size=15", { headers: authHeader() });
};

const deleteAccount = (id) => {
  return axios.delete(API_URL + "users/" + id, { headers: authHeader() });
};

const changeStatusAccount = (id) => {
  // return axios.put(API_URL + "users/" + id, { headers: authHeader() });
  return axios.get(API_URL + "users/" + id, {
    headers: authHeader(),
  });
};
const resetPassword = (id, oldPassword, password) => {
  return axios
    .put(API_URL + "users/reset", {
      id,
      oldPassword,
      password,
      headers: authHeader(),
    })
    .then(
      (response) => {
        toast.success("Reset password success !");
        return response.data;
      },
      (error) => {
        toast.error(error.response.data);
        return error.response;
      }
    );
};

export default {
  getAll,
  deleteAccount,
  changeStatusAccount,
  resetPassword,
};
