
/** 将一个尾随回调的函数转化为promise
 * @param {function} funcWithCallBack 带有回调的函数
 * @param {function} mutiCallBackArgs callback是否为多参数
 * @param {(...any)} args 放在单独括号里面的参数列表
 * @returns {Promise}
 * 示例
function request(params, callback) {
  setTimeout(() => {
    const code = parseInt(Math.random() * 10) % 2
    if (code === 0) {
      callback(null, `resp: ${params}`);
    } else {
      callback(new Error('Error'));
    }
  }, 1000);
}
promisify(request)('params')
.then(resp => {
  log(resp)
}).catch(err => {
  error(err);
});
 */
 export function promisify(funcWithCallBack, mutiCallBackArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(error, ...results) {
        if (error) {
          reject(error);
        } else {
          resolve(mutiCallBackArgs ? results : results[0]);
        }
      }
      args.push(callback);
      funcWithCallBack.call(this, ...args);
    });
  };
}