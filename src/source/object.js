/** 获取对象的所有参数
 * @param {object} obj 对象
 * @param {bolean} isOwnOnly 是否只包含独有的属性
 * @returns {object}
 */
export function properties(obj, isOwnOnly = false) {
  let map = {};
  if (isOwnOnly) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] !== 'function') {
          map[key] = obj[key];
        }
      }
    }
  } else {
    for (const key in obj) {
      if (map[key] === undefined && map[key] !== null) {
        if (typeof obj[key] !== 'function') {
          map[key] = obj[key];
        }
      }
    }
  }
  return map;
}


/** 深拷贝对象
 * @param {object} obj 对象
 * @returns {object}
 */
export function deepCopy(obj) {
  let result;
  const cls = Object.prototype.toString.call(obj).slice(8, -1);
  if (cls === 'Object') {
    result = {}; 
  } else if (cls === 'Array') { 
    result = []; 
  } else { 
    return obj;
  }
  for (const k in obj) {
    const e = obj[k];
    if (Object.prototype.toString.call(e).slice(8, -1) === 'Object') {
      result[k] = deepCopy(e);
    } else if (Object.prototype.toString.call(e).slice(8, -1) === 'Array') {
      result[k] = deepCopy(e);
    } else {
      result[k] = e;
    } 
  }
  return result;
}