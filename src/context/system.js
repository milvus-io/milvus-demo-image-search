import React, { useState, useEffect, useReducer, useContext } from 'react'
import { httpContext } from './http'
import { notification } from 'antd'
import MilvusReducer from "../reducers/milvus-servers"
import { useTranslation } from "react-i18next";

export const systemContext = React.createContext({

  milvusAddress: {}, // all milvus server ip
  setMilvusAddress: () => { },
  globalNotify: () => { },
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
  const { t } = useTranslation();
  const notificationTrans = t("notification")

  const globalNotify = (title, desc, duration = 0) => {
    const args = {
      message: title || notificationTrans.restart.title,
      description: desc || notificationTrans.restart.desc,
      duration,
    };
    notification.open(args);
  };

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
    globalNotify,
    setMilvusAddress
  }}>{children}</Provider>
}
