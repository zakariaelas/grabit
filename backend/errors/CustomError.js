// Custom error handler subclassing the native Error class
// This allows us to throw custom errors with fields like `statusCode`
// so we can gain a better understanding about the error before communicating it to the user
// see ../api/middleware/errors.js to see how this is useful

class CustomError extends Error {
  name = 'CustomError';
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    console.error(this);
  }
  serializeError() {
    return { message: this.message, status: this.statusCode };
  }
}

module.exports = CustomError;
