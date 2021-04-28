

/** 判断任意内容为空，当为对象时，递归检测字段值
 * @param {any} val 任意值
 * @returns {boolean}
 */
export function isEmpty(val) {
  if (val === undefined || val === null) {
    return true;
  }
  const type = typeof(val);
  if (type === 'string') {
    return val === '';
  } else if (type === 'number') {
    return val === 0;
  }  else if (type === 'boolean') {
    return val === false;
  } else if (type === 'object') {
    for (const key in val) {
      if (!isEmpty(val[key])) {
        return false;
      }
    }
    return true;
  } else {
    console.assert(false, `unknown type '${type}'`);
    return true;
  }
}

/** 判断任意内容不为空，当为对象时，递归检测字段值
 * @param {any} val 任意值
 * @returns {boolean}
 */
export function isNotEmpty(val) {
  return !isEmpty(val);
}

/** 判断值为空则采用占位符
 * @param {any} val 任意值
 * @param {any} placeHolder 为空时的占位符
 * @returns {any}
 */
export function noEmpty(val, placeHolder) {
  return isEmpty(val) ? placeHolder : val;
}