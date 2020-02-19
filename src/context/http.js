import React, { useState, useContext, useEffect } from 'react'
import axios from "axios";
import { message } from "antd";
import { HOST, PORT } from "@/consts";

let hasError = false; // make sure only one error message
const axiosInstance = axios.create({
  timeout: 5000
});

axiosInstance.interceptors.response.use(
  function (res) {
    // Do something with res data
    if (res.data && res.data.code === 400) {
      message.error(res.data.data.msg);
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


export const httpContext = React.createContext({
  currentAddress: "", // the current milvus we use
  setCurrentAddress: () => { },
  // data management api
  getTables: () => { },
  createTable: () => { },
  deleteTable: () => { },
  createIndex: () => { },
  searchTable: () => { },
  searchVectors: () => { },
  // config api
  getAdvancedConfig: () => { },
  getHardwareConfig: () => { },
  getMilvusConfig: () => { },
  setMilvusConfig: () => { },
  getSystemConfig: () => { },
  updateAdvancedConfig: () => { },
  updateHardwareConfig: () => { },
  getHardwareType: () => { }
})


const { Provider } = httpContext


export const HttpProvider = ({ children }) => {
  const host = window.localStorage.getItem(HOST) || "";
  const port = window.localStorage.getItem(PORT) || "";
  const [currentAddress, setCurrentAddress] = useState(host && port ? `${host}:${port}` : '') // current milvus ip will store in localstorage
  axiosInstance.defaults.baseURL = `http://${currentAddress}`

  const httpWrapper = (httpFunc) => {
    return () => {
      if (!currentAddress) {
        message.warning("Need connect to milvus first!", 3)
        hasError = true
        setTimeout(() => {
          hasError = false
        }, 2)
        return Promise.resolve()
      }
      return httpFunc()
    }
  }

  // ------- Data Management Start ----------

  async function searchVectors(data = {}) {
    const copyData = JSON.parse(JSON.stringify(data));
    delete copyData.tableName;
    const res = await axiosInstance.put(`/tables/${data.tableName}/vectors`, copyData);
    return res.data;
  }

  async function getTables(params = {}) {
    const res = await axiosInstance.get("/tables", { params });
    return res.data;
  }

  async function createTable(data) {
    const res = await axiosInstance.post("/tables", data);
    return res.data;
  }

  async function deleteTable(name) {
    const res = await axiosInstance.delete(`/tables/${name}`);
    return res.data;
  }

  async function createIndex(tableName, data = {}) {
    const res = await axiosInstance.post(`/tables/${tableName}/indexes`, data);
    return res.data;
  }

  async function searchTable(tableName) {
    const res = await axiosInstance.get(`/tables/${tableName}`);
    return res.data;
  }

  // ------- Data Management End ----------

  // ------- config Api Start ----------
  async function getAdvancedConfig(params = {}) {
    const res = await axiosInstance.get("/config/advanced", { params });
    return res.data;
  }

  async function updateAdvancedConfig(data) {
    const res = await axiosInstance.put("/config/advanced", data);
    return res.data;
  }

  async function getHardwareConfig(params = {}) {
    const res = await axiosInstance.get("/config/gpu_resources", { params });
    return res.data;
  }

  async function updateHardwareConfig(data) {
    const res = await axiosInstance.put("/config/gpu_resources", data);
    return res.data;
  }

  async function setMilvusConfig(data) {
    const res = await axiosInstance.put("/system/config", data);
    return res.data
  }

  async function getSystemConfig() {
    const res = await axiosInstance.get("/devices");
    const { gpus, cpu = {} } = res.data || {};
    let gpuList = [];
    let cpuMemory = cpu.memory || 1000;
    let gpuMemory = 1000000;
    if (gpus) {
      gpuList = [...gpuList, ...Object.keys(gpus)];
      gpuMemory = gpuList.reduce((pre, cur) => {
        if (gpus[cur]) {
          return Math.min(pre, gpus[cur].memory);
        }
        return pre;
      }, gpuMemory);
    }
    return {
      gpuList,
      gpuMemory,
      cpuMemory
    };
  }

  async function getHardwareType() {
    const res = await axiosInstance.get("/system/mode");
    // return "CPU";
    return res.data ? res.data.reply || "CPU" : "CPU";
  }
  // ------- config Api End ----------

  return <Provider value={{
    currentAddress,
    setCurrentAddress,
    // config api
    getAdvancedConfig: httpWrapper(getAdvancedConfig),
    getHardwareConfig: httpWrapper(getHardwareConfig),
    setMilvusConfig: httpWrapper(setMilvusConfig),
    getSystemConfig: httpWrapper(getSystemConfig),
    updateAdvancedConfig: httpWrapper(updateAdvancedConfig),
    updateHardwareConfig: httpWrapper(updateHardwareConfig),
    getHardwareType: httpWrapper(getHardwareType),
    // data management api
    searchVectors: httpWrapper(searchVectors),
    getTables: httpWrapper(getTables),
    createTable: httpWrapper(createTable),
    deleteTable: httpWrapper(deleteTable),
    createIndex: httpWrapper(createIndex),
    searchTable: httpWrapper(searchTable)
  }}>{children}</Provider>
}
