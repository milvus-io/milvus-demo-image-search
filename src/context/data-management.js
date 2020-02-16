import React, { useReducer, useContext, useEffect } from 'react'
import DataManagementReducer, { ADD, KEYS } from '../reducers/data-management'
import { httpContext } from './http'
export const dataManagementContext = React.createContext({
  dataManagement: {},
  setDataManagement: () => { }
})


const { Provider } = dataManagementContext

export const DataManagementProvider = ({ children }) => {
  const { currentAddress } = useContext(httpContext)
  const [dataManagement, setDataManagement] = useReducer(DataManagementReducer, {
    /**
     *  data // search result
        formInit, // form value
     */
    vectorSearch: {}
  });
  useEffect(() => {
    if (!currentAddress || dataManagement[KEYS.vectorSearch][currentAddress]) return
    setDataManagement({
      type: ADD,
      payload: {
        key: KEYS.vectorSearch,
        id: currentAddress,
        value: {
          formInit: {},
          data: null
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress])

  return <Provider value={{ dataManagement, setDataManagement }}>{children}</Provider>
}
