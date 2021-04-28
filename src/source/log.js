

/** 打印日志信息 */
export function log(val) {
  console.log(pureString(val));
}
/** 打印警告信息 */
export function warn(val) {
  console.warn(pureString(val));
}
/** 打印错误信息 */
export function error(val) {
  console.error(pureString(val));
}
/** 弹出框 */
export function alert(val) {
  alert(pureString(val));
}

/** 转换任意值为方便调试的字串
 * @param {any} val 重复内容
 * @returns {string}
 */
 export function pureString(val) {
  if (val === undefined) {
    return 'undefined';
  } else if (val === null) {
    return 'null';
  } else {
    const type = typeof(val);
    if (type === 'string' || type === 'number' || type === 'boolean' ) {
      return val;
    } else if (type === 'object') {
      return JSON.stringify(val);
    } else if (type === 'function') {
      return JSON.stringify(val);
    } else {
      console.assert(false, `unknown type '${type}'`);
      return 'unknown';
    }
  }
}
