import React, { useState, useEffect, useReducer, useContext } from 'react'
import { httpContext } from './http'

import MilvusReducer from "../reducers/milvus-servers"
import axios from 'axios'
export const systemContext = React.createContext({

  milvusAddress: {}, // all milvus server ip
  setMilvusAddress: () => { },
  /**
   * key: milvus address
   * value: {sysytemConfig: {}, version: ''}
   */
  systemInfos: {},
  /**
   * systemInfos[currentAddress]
   */
  storageConfig: {},
  serverConfig: {},
  metricConfig: {},
  dbConfig: {}
})


const { Provider } = systemContext

export const SystemProvider = ({ children }) => {
  const [systemInfos, setSystemInfos] = useState({});
  const [storageConfig, setStorageConfig] = useState({})
  const [dbConfig, setDbConifg] = useState({})
  const [serverConfig, setServerConfig] = useState({})
  const [metricConfig, setMetricConfig] = useState({})
  const [milvusConfigs, setMilvusConfigs] = useState({})
  const [milvusAddress, setMilvusAddress] = useReducer(MilvusReducer, {});
  const { currentAddress, setCurrentAddress, getSystemConfig, getMilvusConfigs, restartNotify, getHardwareType } = useContext(httpContext)


  const getInfosFromUrl = (url) => {
    if (!url) return
    const type = url.includes('sqlite') ? "sqlite" : "mysql"
    const usrPwd = url.match(/\/\/(\S*)@/)[1];
    const username = usrPwd ? usrPwd.split(":")[0] : ""
    const password = usrPwd ? usrPwd.split(":")[1] : ""

    const hostPort = url.match(/@(\S*)\//)[1];
    const host = hostPort ? hostPort.split(":")[0] : ""
    const port = hostPort ? hostPort.split(":")[1] : ""
    return {
      type,
      username,
      password, host,
      port
    }
  }
  useEffect(() => {
    const key = Object.keys(milvusAddress).find(key => milvusAddress[key] && milvusAddress[key].connected)
    const connectedMilvus = key && milvusAddress[key]
    const checkConnect = async (url) => {
      try {
        const res = await axios.get(`http://${url}/state`)
        if (res.data.code === 0) {
          setCurrentAddress(url)
        }
      } catch (error) {
        throw error
      }
    }
    if (connectedMilvus) {
      checkConnect(connectedMilvus.url)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(milvusAddress)])

  useEffect(() => {
    if (!currentAddress) return

    const fetchData = async () => {
      //TODO: what if reject?
      const res = await Promise.all([
        getSystemConfig(),
        getMilvusConfigs(),
        getHardwareType()
      ]);
      const [currSystemConfig, currMilvusConfigs, currHardwareType] = res
      setMilvusConfigs(currMilvusConfigs)
      setSystemInfos(v => ({ ...v, [currentAddress]: { ...currSystemConfig, hardwareType: currHardwareType } }));
      const { storage_config = {}, server_config = {}, db_config = {}, metric_config = {}, restart_required = false } = res[1] || {}
      const backendUrl = db_config.backend_url
      const dbConfig = getInfosFromUrl(backendUrl)
      setStorageConfig(v => ({ ...v, [currentAddress]: { ...storage_config } }))
      setServerConfig(v => ({ ...v, [currentAddress]: { ...server_config } }))
      setMetricConfig(v => ({ ...v, [currentAddress]: { ...metric_config } }))
      setDbConifg(v => ({ ...v, [currentAddress]: { ...dbConfig } }))
      if (restart_required) {
        restartNotify()
      }
    };
    console.info("sytem in")
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  return <Provider value={{
    systemInfos,
    storageConfig,
    serverConfig,
    metricConfig,
    dbConfig,
    milvusAddress,
    setMilvusAddress,
    milvusConfigs
  }}>{children}</Provider>
}
