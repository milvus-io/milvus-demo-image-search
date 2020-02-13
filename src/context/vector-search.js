import React, { useState } from 'react'

export const vectorSearchContext = React.createContext({
  data: null,
  formInit: {},
  setData: () => { },
  setFormInit: () => { }
})


const { Provider } = vectorSearchContext

export const VectorSearchProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [formInit, setFormInit] = useState({})
  return <Provider value={{ data, setData, formInit, setFormInit }}>{children}</Provider>
}
