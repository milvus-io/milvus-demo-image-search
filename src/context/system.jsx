import React, { useState, useEffect, useReducer, useContext } from 'react'
import { httpContext } from './http'
import MilvusReducer from "../reducers/milvus-servers"

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

  const [milvusAddress, setMilvusAddress] = useReducer(MilvusReducer, {});
  const { currentAddress, setCurrentAddress, getSystemConfig, getMilvusConfigs, restartNotify } = useContext(httpContext)


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
    setCurrentAddress(connectedMilvus ? connectedMilvus.url : "")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(milvusAddress)])

  useEffect(() => {

    const fetchData = async () => {
      const res = await Promise.all([
        getSystemConfig(),
        getMilvusConfigs()
      ]);
      setSystemInfos(v => ({ ...v, [currentAddress]: { ...res[0] } }));
      const { storage_config = {}, server_config = {}, db_config = {}, metric_config = {}, restart_required = false } = res[1] ? res[1].reply || {} : {}
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
    console.log("sytem in")
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
    setMilvusAddress
  }}>{children}</Provider>
}
