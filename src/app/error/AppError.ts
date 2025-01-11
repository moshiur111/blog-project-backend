/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
class AppError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode: number, stack?: '') {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
