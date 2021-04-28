
/** 错误处理的基类
 */
export class BaseError extends Error {
  constructor(code, message, error) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.error = error;
  }
}