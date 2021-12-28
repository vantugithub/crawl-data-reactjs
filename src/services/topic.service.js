import axios from "axios";
import authHeader from "./auth-header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const API_URL =
  "https://instagram-smart-crawler.herokuapp.com/api/admin-management/";

const getAll = () => {
  return axios.get(API_URL + "topics", {
    headers: authHeader(),
  });
};

const deleteTopic = (id) => {
  return axios.delete(API_URL + "topics/" + id, { headers: authHeader() });
};

const addTopic = (nameTopic) => {
  return axios
    .post(API_URL + "topics", {
      nameTopic: nameTopic,
      headers: authHeader(),
    })
    .then(
      (response) => {
        toast.success("Add success !");
        return response.data;
      },
      (error) => {
        toast.error(error.response.data);
        return error.response;
      }
    );
};

const changeStatusTopic = (id) => {
  return axios.put(API_URL + "topics/" + id, {
    id,
    // headers: authHeader(),
  });
};

export default {
  getAll,
  deleteTopic,
  addTopic,
  changeStatusTopic,
};
