import { message } from 'antd'

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

/**
 * 
 * @param {*} obj  {a:1}
 * @param {*} key1 "label"
 * @param {*} key2 "value"
 * @returns {*} [{[key1]:a,[key2]:1}]
 */
export const parseObjectToAssignKey = (obj, key1, key2) => {
  return Object.keys(obj).map(key => {
    const val = obj[key]
    return {
      [key1]: key,
      [key2]: val,
    }
  })
}

export const sliceWord = (text, length = 12) => text.length > length ? `${text.slice(0, length)}...` : text;