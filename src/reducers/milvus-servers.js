import { cloneObj } from '../utils/helpers'
import { message } from 'antd'

export const ADD = "add"
export const DELETE = "delete"

function milvusServers(state, action) {
  const copyState = cloneObj(state)
  switch (action.type) {
    case ADD:
      const { host, port } = action.payload
      const url = `${host}:${port}`
      if (copyState[url]) {
        message.warning(`Already connect with http://${url}`)
        return copyState
      }
      copyState[url] = action.payload
      return copyState
    case DELETE:
      if (copyState[action.payload.id]) {
        delete copyState[action.payload.id]
      }
      return copyState
    default:
      return copyState
  }
}

export default milvusServers