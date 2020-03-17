import React, { useContext } from 'react'
import axios from "axios";
import { materialContext } from './Root'
import { useTranslation } from "react-i18next";

let hasError = false; // make sure only one error message
const axiosInstance = axios.create({
  timeout: 5000,
  baseURL: "http://123123"
});

export const httpContext = React.createContext({
})


const { Provider } = httpContext

export const HttpProvider = ({ children }) => {
  const { t } = useTranslation();
  const { openSnackBar } = useContext(materialContext)

  axiosInstance.interceptors.response.use(
    function (res) {
      // Do something with res data
      if (res.data && res.data.code === 400) {
        openSnackBar(res.data.data.msg, 'error')
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
        errMsg && openSnackBar(errMsg, 'error')
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
        openSnackBar(error.message, 'error')
      }
      return Promise.reject(error);
    }
  );

  // ------- Data Management Start ----------

  async function searchVectors(collectionName, data = {}) {
    const res = await axiosInstance.put(`/collections/${collectionName}/vectors`, data);
    return res.data;
  }


  return <Provider value={{
    // config api
    searchVectors,

  }}>{children}</Provider>
}
