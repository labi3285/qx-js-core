
/** 转换任意值为布尔值
 * @param {any} val 任意值
 * @returns {boolean}
 */
export function toBoolean(val) {
  if (val === undefined || val === null) {
    return false;
  }
  const type = typeof(val);
  if (type === 'string') {
    const lowerCase = val.toLowerCase();
    return lowerCase.indexOf('t') !== -1 || lowerCase.indexOf('y') !== -1;
  } else if (type === 'number') {
    return val !== 0;
  }  else if (type === 'boolean') {
    return val;
  } else if (type === 'object') {
    return true;
  } else {
    console.assert(false, `unknown type '${type}'`);
    return false;
  }
}