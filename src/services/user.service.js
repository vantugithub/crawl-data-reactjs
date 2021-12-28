import axios from "axios";
import authHeader from "./auth-header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const API_URL =
  "https://instagram-smart-crawler.herokuapp.com/api/user-management/";

const reset = (id, oldPassword, password) => {
  return axios
    .put(API_URL + "reset", {
      id,
      oldPassword,
      password,
      headers: authHeader(),
    })
    .then(
      (response) => {
        toast.success("Change success !");
        return response.data;
      },
      (error) => {
        toast.error(error.response.data);
        return error.response;
      }
    );
};

export default {
  reset,
};
