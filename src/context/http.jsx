import React, { useContext } from 'react'
import axios from "axios";
import { rootContext } from './Root'
// import { useTranslation } from "react-i18next";

let hasError = false; // make sure only one error message
const axiosInstance = axios.create({
  baseURL: "http://40.117.75.127:5004/api/v1/"
});

export const httpContext = React.createContext({
  search: (formData) => { }
})


const { Provider } = httpContext

export const HttpProvider = ({ children }) => {
  // const { t } = useTranslation();
  const { openSnackBar } = useContext(rootContext)

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

  async function search(formData) {
    const res = await axiosInstance.post(`/search`, formData);
    return res.data;
  }


  return <Provider value={{
    search
  }}>{children}</Provider>
}
