import { cloneObj } from '../utils/helpers'

// actions
export const ADD = "add"
export const DELETE = "delete"
export const UPDATE = "update"
export const INIT = "init"
// keys
export const KEYS = {
  vectorSearch: "vectorSearch",
  table: "table"
}

function dataManagement(state, action) {
  const copyState = cloneObj(state)
  const { key, value = {}, id, keys = [], values = {} } = action.payload
  switch (action.type) {
    case INIT:
      keys.forEach(k => {
        copyState[k][id] = values[k]
      });
      return copyState
    case ADD:
      if (copyState[key][id]) {
        console.log('Already exist. Need update not add')
        return copyState
      }
      copyState[key][id] = value
      return copyState
    case DELETE:
      if (copyState[key][id]) {
        delete copyState[id]
      }
      return copyState
    case UPDATE:
      if (copyState[key][id]) {
        copyState[key][id] = { ...copyState[key][id], ...value }
      }
      console.log('update', copyState)
      return copyState
    default:
      return copyState
  }
}

export default dataManagement