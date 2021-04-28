
/** 可迭代区间
 * @param {int} from 起始
 * @param {int} to 结束
 * @returns {Generator} 
 */
export function* range(from, to) {
  for (let i = from; i <= to; i ++) {
    yield i;
  }
}

// export async function* rangeAsyncDo(from, to, todo) {
//   for (let i = from; i <= to; i ++) {
//     const resp = await new Promise(function(resolve, reject) {
//       todo(i, (error, obj) => { 
//         if (error) {
//           reject(error);
//         } else {
//           resolve(obj);
//         }
//       });
//     });
//     yield { index: i, response: resp };
//   }
// }

// export async function* rangeAsyncDo(argsArray, todo) {
//   for (const args in argsArray) {
//     const resp = await new Promise(function(resolve, reject) {
//       todo(args, (error, obj) => { 
//         if (error) {
//           reject(error);
//         } else {
//           resolve(obj);
//         }
//       });
//     });
//     yield { index: i, response: resp };
//   }
// }