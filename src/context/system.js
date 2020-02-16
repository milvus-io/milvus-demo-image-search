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
  currentSystemInfo: {}
})


const { Provider } = systemContext

export const SystemProvider = ({ children }) => {
  const [systemInfos, setSystemInfos] = useState({});
  const [milvusAddress, setMilvusAddress] = useReducer(MilvusReducer, {});
  const { currentAddress, getSystemConfig } = useContext(httpContext)
  useEffect(() => {
    if (!currentAddress) return
    const fetchData = async () => {
      const res = await Promise.all([
        getSystemConfig(),
      ]);
      setSystemInfos(v => ({ ...v, [currentAddress]: { ...res[0] } }));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress]);

  return <Provider value={{
    currentSystemInfo: systemInfos[currentAddress] || {},
    systemInfos,
    milvusAddress,
    setMilvusAddress
  }}>{children}</Provider>
}
