import React, { useReducer, useContext, useEffect } from 'react'
import DataManagementReducer, { INIT, KEYS } from '../reducers/data-management'
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
    vectorSearch: {},
    /**
     * data // search result
     */
    table: {}
  });
  useEffect(() => {
    if (!currentAddress || dataManagement[KEYS.vectorSearch][currentAddress]) return
    setDataManagement({
      type: INIT,
      payload: {
        keys: [KEYS.vectorSearch, KEYS.table],
        id: currentAddress,
        values: {
          [KEYS.vectorSearch]: {
            formInit: {},
            data: null
          },
          [KEYS.table]: {
            data: null
          }
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAddress])

  return <Provider value={{ dataManagement, setDataManagement }}>{children}</Provider>
}
