import { message } from 'antd'
import { CLIENT_HISTORY } from '../consts'

export const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const generateId = (prefix = 'id') =>
  `${prefix}_${Math.random()
    .toString(36)
    .substr(2, 16)}`;

export const clipboard = (text, successTxt) => {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.select();
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    message.success(successTxt)
  }
  document.body.removeChild(input);
}

export const validateEmpty = (value) => {
  if (value && !value.trim) {
    return true
  }
  return !!value && value.trim().length
}

export const safetyGet = (obj = {}, key = "", defaultVal = "") => {
  return obj[key] || defaultVal
}

export const getConnectedMilvus = () => {
  try {
    let clients = window.localStorage.getItem(CLIENT_HISTORY) || {}
    clients = JSON.parse(clients)
    const key = Object.keys(clients).find(key => clients[key] && clients[key].connected)
    return key && clients[key]
  } catch (error) {
    console.error(error)
    return false
  }
}