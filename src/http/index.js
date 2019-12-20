import axios from "axios";
import { message } from "antd";
const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://192.168.1.57:19121",
  timeout: 5000
});
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function(res) {
    console.log("response");
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
    if (error.response && error.response.data) {
      const code = error.response.data.code;
      if (code === 401) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Do something with response error
    return Promise.reject(error);
  }
);

export default http;
