import { cloneObj } from '../utils/helpers'

// actions
export const ADD = "add"
export const DELETE = "delete"
export const UPDATE = "update"

// keys
export const KEYS = {
  vectorSearch: "vectorSearch"
}

function dataManagement(state, action) {
  const copyState = cloneObj(state)
  const { key, value = {}, id, } = action.payload
  switch (action.type) {
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