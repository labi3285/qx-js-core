import { isEmpty } from './empty.js';
import { toString, repeatString } from './string.js';

/** 转换任意值为数值
 * @param {any} val
 * @returns {float}
 */
export function toNumber(val) {
  if (val === undefined || val === null) {
    return NaN;
  } else {
    const type = typeof(val);
    if (type === 'string') {
      return parseFloat(val);
    } else if (type === 'number') {
      return val;
    } else if (type === 'boolean') {
      return val ? 1 : 0;
    } else {
      return NaN;
    }
  }
}

/** 四舍五入（准确） 
 * @param {any} val
 * @param {int} dec 保留小数
 * @param {any} isFillTailWithZeros 小数位不足时是否补充0 
 * @returns {string}
 */
export function roundString(val, dec, isFillTailWithZeros = false) {
  const num = toNumber(val);
  if (isNaN(num)) {
    return 'NaN';
  }  
  const numStr = scientificNumberToPlainString(num.toString());
  const comps = numStr.split('.');
  if (comps.length === 1) {
    if (isFillTailWithZeros) {
      return `${comps[0]}.${repeatString('0', dec)}`;
    } else {
      return `${comps[0]}`;
    }
  } else if (comps.length === 2) {
    const intStr = comps[0];
    const decStr = comps[1];
    let tailStr = '';
    if (decStr.length === 0) {
      let tailZeroStr = '';
      if (isFillTailWithZeros) {
        for (let i = 0; i < dec; i ++) {
          tailZeroStr += '0';
        }
      }
      return `${intStr}.${tailZeroStr}`;
    } else if (decStr.length < dec) {
      if (isFillTailWithZeros) {
        return `${intStr}.${decStr}${repeatString('0', dec - decStr.length)}`;
      } else {
        return `${intStr}.${decStr}`;
      }
    } else if (decStr.length === dec) {
      return `${intStr}.${decStr}`;
    } else {
      if ('56789'.indexOf(decStr[dec]) === -1) {
        return `${intStr}.${decStr.slice(0, dec)}`;
      } else {
        const newDecStr = decStr.slice(0, dec);
        const newDecStrAdd1 = (parseInt(newDecStr) + 1).toString();
        if (newDecStrAdd1.length < newDecStr.length) {
          return `${parseInt(intStr)}.${repeatString('0', newDecStr.length - newDecStrAdd1.length)}${newDecStrAdd1}`;
        } else if (newDecStrAdd1.length === newDecStr.length) {
          if (isFillTailWithZeros) {
            return `${parseInt(intStr)}.${newDecStrAdd1}`;
          } else {
            let i = newDecStrAdd1.length;
            while (i >= 1) {
              i -= 1;
              if (newDecStrAdd1[i] !== '0') {
                i += 1;
                break;
              }
            }
            if (i === 0) {
              return `${parseInt(intStr)}`;
            } else {
              return `${parseInt(intStr)}.${newDecStrAdd1.slice(0, i)}`;
            }
          }
          
        } else {
          let newDecStrAdd1From1 = newDecStrAdd1.slice(1, dec + 1);
          if (isFillTailWithZeros) {
            return `${parseInt(intStr) + 1}.${newDecStrAdd1From1}`;
          } else {
            let i = newDecStrAdd1From1.length - 1;
            while (i >= 1) {
              i -= 1;
              if (newDecStrAdd1From1[i] !== '0') {
                i += 1;
                break;
              }
            }
            if (i === 0) {
              return `${parseInt(intStr) + 1}`;
            } else {
              return `${parseInt(intStr) + 1}.${newDecStrAdd1From1.slice(0, i)}`;
            }
          }
        }
      }
    }
  } else {
    return 'NaN';
  }
}

/** 四舍五入（准确） 
 * @param {any} val
 * @param {int} dec 保留小数
 * @param {any} isFillTailWithZeros 小数位不足时是否补充0 
 * @returns {string}
 */
 export function roundStringByRegex(val, dec) {
  let s = val + '';
  if (!dec) dec = 0;
  if (typeof(dec) == 'string') {
    dec = Number(dec);
  }
  if (s.indexOf('.') == -1) {
      s += '.';
  }
  s = scientificNumberToPlainString(s); //处理e+、e-情况
  s += repeatString('0', dec);
  if (new RegExp('^(-|\\+)?(\\d+(\\.\\d{0,' + (dec + 1) + '})?)\\d*$').test(s)) {
      var _s = '0' + RegExp.$2,
          pm = RegExp.$1,
          a = RegExp.$3.length,
          b = true;
      if (a == d + 2) {
          a = _s.match(/\d/g);
          if (parseInt(a[a.length - 1]) > 4) {
              for (var i = a.length - 2; i >= 0; i--) {
                  a[i] = parseInt(a[i]) + 1;
                  if (a[i] == 10) {
                      a[i] = 0;
                      b = i != 1;
                  } else break;
              }
          }
          _s = a.join('').replace(new RegExp('(\\d+)(\\d{' + d + '})\\d$'), '$1.$2');
      }
      if (b) {
          _s = _s.substr(1);
      }
      return (pm + _s).replace(/\.$/, '');
  }
  return val + '';
}

/** 转换数值为逗号分割的便于阅读的格式
 * @param {any} val 数值
 * @param {int} dec 保留小数
 * @param {int} commaInterval 几位整数一分割
 * @param {any} isFillTailWithZeros 小数位不足时是否补充0 
 * @returns {string}
 */
 export function commaString(val, dec, commaInterval, isFillTailWithZeros = false) {
  return roundString(val, dec, isFillTailWithZeros).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/** 将科学计数值转换为正常展示的值 
 * @param {any} val
 * @returns {string}
 */
export function scientificNumberToPlainString(val) {
  if (val === undefined || val === null) {
    return '';
  }
  let valStr = val.toString();
  let i = valStr.indexOf('E');
  if (i == -1) {
    i = valStr.indexOf('e');
  }
  if (i == -1) {
    return valStr;
  }
  let beforeStr = valStr.slice(0, i);
  let afterStr = parseInt(valStr.slice(i + 1, valStr.length));
  const beforeStrComps = beforeStr.split('.');
  const beforeIntStr = beforeStrComps[0] || '';
  const beforeDecStr = beforeStrComps[1] || '';
  if (afterStr < 0) {
    const pow = -afterStr;
    if (beforeIntStr.length > pow) {
      const intStr = beforeIntStr.slice(0, pow);
      const endStr = beforeIntStr.substring(pow, beforeIntStr.length);
      return intStr + '.' + endStr + endStr;
    } else if (beforeIntStr.length < pow) {
      return `0.${repeatString('0', pow - beforeIntStr.length)}${beforeIntStr}${beforeDecStr}`;
    } else {
      return '0.' + beforeIntStr + beforeDecStr;
    }
  } else {
    
    if (beforeDecStr.length > afterStr) {
      const intStr = beforeDecStr.substring(0, afterStr);
      const endStr = beforeDecStr.substring(afterStr, beforeDecStr.length);
      return beforeIntStr + intStr + '.' + endStr;
    } else if (beforeDecStr.length < afterStr) {
      return beforeIntStr + beforeDecStr + repeatString('0', afterStr - beforeDecStr.length);
    } else {
      return beforeIntStr + beforeDecStr;
    }
  }
}
