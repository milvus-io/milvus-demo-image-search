import axios from "axios";
import { message } from "antd";
import { URL } from "@/consts";

let hasError = false; // make sure only one error message
const http = axios.create({
  timeout: 5000
});
http.interceptors.request.use(
  function(config) {
    const milvUrl = window.localStorage.getItem(URL) || "";

    console.log(config);
    // Do something before request is sent
    return { ...config, url: `http://${milvUrl}${config.url}` };
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function(res) {
    console.log("response", res);
    // Do something with res data
    if (res.data && res.data.code === 400) {
      message.error(res.data.data.msg);
      return res;
    }
    if (res.data && res.data.code === 401) {
      window.location.href = "/login";
      return res;
    }
    return res;
  },
  function(error) {
    if (hasError) {
      return Promise.reject(error);
    }
    if (error.response && error.response.data) {
      const { message: errMsg } = error.response.data;
      errMsg && message.error(errMsg);
      hasError = true;
      setTimeout(() => {
        hasError = false;
      }, 2000);
      return Promise.reject(error);
    }
    if (error.message) {
      hasError = true;
      setTimeout(() => {
        hasError = false;
      }, 2000);
      message.error(error.message);
    }
    return Promise.reject(error);
  }
);

export function changeBaseUrl(url) {
  http.defaults.baseURL = url || "";
  return http;
}

export default http;
