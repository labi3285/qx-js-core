/** 转换日期为格式字符串
 * @param {Date} date 日期
 * @param {string} fmt 日期格式，默认yyyy-MM-dd HH:mm:ss
 * 年： yyyy
 * 月：MM
 * 日：dd
 * 24小时制的时：HH（为了方便，这里不支持hh）
 * 分：mm
 * 秒：ss
 * @returns {string}
 */
export function dateString(date, fmt = 'yyyy-MM-dd HH:mm:ss') {
  const o = {
      'M+' : date.getMonth() + 1,
      'd+' : date.getDate(),
      'H+' : date.getHours(),
      'm+' : date.getMinutes(),
      's+' : date.getSeconds(),
      'q+' : Math.floor((date.getMonth() + 3) / 3),
      'S'  : date.getMilliseconds(),
    };
  if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
          const x = o[k];
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (x) : (('00' + x).substr(('' + x).length)));
      }
  }
  return fmt;
}