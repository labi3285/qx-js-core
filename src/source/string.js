

/** 转换任意值为字符串
 * @param {any} val
 * @returns {string}
 */
export function toString(val) {
  if (val === undefined || val === null) {
    return '';
  } else {
    const type = typeof(val);
    if (type === 'string') {
      return val;
    } else if (type === 'number') {
      return val.toString();
    } else if (type === 'boolean') {
      return val.toString();
    } else if (type === 'object') {
      return JSON.stringify(val);
    } else {
      console.assert(false, `unknown type '${type}'`);
      return 'unknown';
    }
  }
}

/** 输出重复字符串
 * @param {string} repeatStr 重复内容
 * @param {int} times 重复次数
 * @returns {string}
 */
export function repeatString(repeatStr, times) {
  let t = '';
  while (times > 0) {
    t += repeatStr;
    times -= 1;
  }
  return t;
}
