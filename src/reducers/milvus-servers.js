import { cloneObj } from '../utils/helpers'
import { LOG_SERVER, PM_SERVER, CLIENT_HISTORY } from '../consts/index'
import { message } from 'antd'

export const ADD = "add"
export const DISCONNECT = "disconnect"
export const UPDATE = "update"
export const INIT = "init" // get all address from localstorage at first time 

/**
 * 
 * @param {*} state: host port connected pmServer logServer  
 * @param {*} action 
 */
function milvusServers(state, action) {
  const copyState = cloneObj(state)
  const { id, values = {}, url = "" } = action.payload

  switch (action.type) {
    case INIT:
      console.log("init", action.payload)
      return action.payload
    case ADD:
      if (copyState[url]) {
        message.warning(`Already connect with http://${url}`)
        return copyState
      }
      Object.keys(copyState).forEach(v => {
        copyState[v].connected = false
        return v
      })
      copyState[url] = action.payload
      window.localStorage.setItem(CLIENT_HISTORY, JSON.stringify(copyState))
      return copyState
    case DISCONNECT:
      if (copyState[id]) {
        copyState[id].connected = false
      }
      window.localStorage.setItem(CLIENT_HISTORY, JSON.stringify(copyState))
      return copyState
    case UPDATE:
      if (copyState[id]) {
        copyState[id] = {
          ...copyState[id],
          ...values
        }
      }
      window.localStorage.setItem(CLIENT_HISTORY, JSON.stringify(copyState))

      return copyState
    default:
      return copyState
  }
}

export default milvusServers