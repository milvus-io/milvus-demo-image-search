import React, { useState, useEffect } from 'react'
import {
  getSystemConfig,
} from "@/http/configs";
export const systemContext = React.createContext({
  systemConfig: null,
  version: null,
})


const { Provider } = systemContext

export const SystemProvider = ({ children }) => {
  const [systemConfig, setSystemConfig] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const res = await Promise.all([
        getSystemConfig(),
      ]);
      setSystemConfig(res[0] || {});
    };
    fetchData();
  }, []);
  return <Provider value={{ systemConfig }}>{children}</Provider>
}
