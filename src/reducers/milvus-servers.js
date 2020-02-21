import { cloneObj } from '../utils/helpers'
import { LOG_SERVER, PM_SERVER } from '../consts/index'
import { message } from 'antd'

export const ADD = "add"
export const DELETE = "delete"
export const UPDATE = "update"

function milvusServers(state, action) {
  const copyState = cloneObj(state)
  const { host, port, id, values = {} } = action.payload

  switch (action.type) {
    case ADD:
      const url = `${host}:${port}`
      if (copyState[url]) {
        message.warning(`Already connect with http://${url}`)
        return copyState
      }
      copyState[url] = action.payload
      return copyState
    case DELETE:
      if (copyState[id]) {
        delete copyState[id]
      }
      return copyState
    case UPDATE:
      if (copyState[id]) {
        copyState[id] = {
          ...copyState[id],
          ...values
        }
        window.localStorage.setItem(LOG_SERVER, values[LOG_SERVER])
        window.localStorage.setItem(PM_SERVER, values[PM_SERVER])
      }
      return copyState
    default:
      return copyState
  }
}

export default milvusServers