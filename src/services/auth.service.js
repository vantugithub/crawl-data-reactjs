import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const API_URL = "https://instagram-smart-crawler.herokuapp.com/api/auth/";

const register = (email, fullName, password, username) => {
  return axios
    .post(API_URL + "signup", {
      email,
      fullName,
      password,
      username,
    })
    .then(
      (response) => {
        toast.success("Register success ! <> Wait for Admin Approve You !");
        return response.data;
      },
      (error) => {
        toast.error(error.response.data);

        return;
      }
    );
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      password,
      username,
    })
    .then(
      (response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("userToken", "Bearer " + response.data.token);
          axios.defaults.headers.common["Authorization"] =
            localStorage.getItem("userToken");
        }
        alert("Login success !");
        return response.data;
      },
      (error) => {
        const message =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        alert("Login Failed");
        return error.response;
      }
    );
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
