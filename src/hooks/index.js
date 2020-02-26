import { useContext, } from 'react'

import { useLocation } from 'react-router-dom'
import { UPDATE, ADD } from '../consts'
import { httpContext } from '../context/http'
import { systemContext } from '../context/system'
import { materialContext } from '../context/material'


import axios from 'axios'

axios.defaults.timeout = 2000

export function useConnectMilvus() {
  const { setCurrentAddress } = useContext(httpContext)
  const { setMilvusAddress } = useContext(systemContext)
  const { openSnackBar } = useContext(materialContext)
  const handleConnect = async (url, type, values) => {
    try {
      const res = await axios.get(`http://${url}/state`)
      if (res && res.data && res.data.code === 0) {
        openSnackBar("Connect Success")
        switch (type) {
          case ADD:
            setMilvusAddress({
              type: ADD,
              payload: {
                id: url,
                values
              }
            })
            break
          case UPDATE:
            setMilvusAddress({
              type: UPDATE,
              payload: {
                id: url,
                values: {
                  connected: true
                }
              }
            })
            break
          default:
            return
        }
        setCurrentAddress(url)
      }
    } catch (error) {
      openSnackBar(error.message || "Connect Fail", "error")
      throw error
    }

  }
  return handleConnect
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}


