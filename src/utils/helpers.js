export const cloneObj = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const generateId = (prefix = 'id') =>
  `${prefix}_${Math.random()
    .toString(36)
    .substr(2, 16)}`;