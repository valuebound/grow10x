import axios from "axios";
import { notification } from "antd";
import { STORAGE_KEY_CONSTANT } from "./constants";
const env = process.env.REACT_APP_ENV;
const { config } = require(`../config/${env}.config`);

const instance = axios.create({
  baseURL: config.REACT_APP_API_HOST,
  headers: { "x-access-token": localStorage.getItem(STORAGE_KEY_CONSTANT) || "" },
  timeout: 30 * 1000,
});

instance.interceptors.response.use(
  (response) => {
    // if(response.data.status === "success") notification.success({ message: response.data?.message })
    return response
  },
  (error) => {
    if (error.response.data?.message === "User is Inactive" || error.response?.statusText === "User is Inactive") {
      localStorage.clear();
      window.location.reload()
    }
    if (error.response.status >= 400 && error.response.status <= 503 && error.response.status !== 401 && error?.config?.url !== "/auth/logout") {
      notification.error({ message: error.response.data?.message || error.response?.statusText })
    }
    return Promise.reject(error);
  }
);

export default instance;
