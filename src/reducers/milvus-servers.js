import { cloneObj } from '../utils/helpers'
import { INIT, ADD, DISCONNECT, UPDATE, CLIENT_HISTORY } from '../consts/index'
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
      Object.keys(copyState).forEach(v => {
        copyState[v].connected = false
        return v
      })
      if (copyState[url]) {
        copyState[url].connected = true
      } else {
        copyState[url] = action.payload
      }
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