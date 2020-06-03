import React, { useContext } from "react";
import axios from "axios";
import { rootContext } from "./Root";
// import { useTranslation } from "react-i18next";

let hasError = false; // make sure only one error message
let endpoint = "http://192.168.1.10:5000";
if (window._env_ && window._env_.API_URL) {
  endpoint = window._env_.API_URL;
}
const axiosInstance = axios.create({
  baseURL: `${endpoint}/v1`,
});

export const httpContext = React.createContext({
  search: (formData) => {},
  getCount: () => {},
  getApps: () => {},
});

const { Provider } = httpContext;

export const HttpProvider = ({ children }) => {
  // const { t } = useTranslation();
  const { openSnackBar } = useContext(rootContext);

  axiosInstance.interceptors.response.use(
    function (res) {
      // Do something with res data
      if (res.data && res.data.code === 400) {
        openSnackBar(res.data.data.msg, "error");
        return res;
      }
      return res;
    },
    function (error) {
      if (hasError) {
        return Promise.reject(error);
      }
      if (error.response && error.response.data) {
        const { message: errMsg } = error.response.data;
        errMsg && openSnackBar(errMsg, "error");
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
        openSnackBar(error.message, "error");
      }
      return Promise.reject(error);
    }
  );

  // ------- Data Management Start ----------

  async function search(formData, app) {
    const res = await axiosInstance.post(
      `/application/${app}/search`,
      formData
    );
    return res.data;
  }

  async function getCount() {
    const res = await axiosInstance.post(`/count`);
    return res.data;
  }

  async function getApps() {
    const res = await axiosInstance.get("/application");
    return res.data;
  }

  return (
    <Provider
      value={{
        search,
        getCount,
        getApps,
      }}
    >
      {children}
    </Provider>
  );
};
