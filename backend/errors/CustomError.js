// Custom error handler subclassing the native Error class
// This allows us to throw custom errors with fields like `statusCode`
// so we can gain a better understanding about the error before communicating it to the user
// see ../api/middleware/errors.js to see how this is useful
const logger = require('../utils/logger');

class CustomError extends Error {
  name = 'CustomError';
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    //logger.error(this.logError());
    console.error(this);
  }
  serializeError() {
    return { message: this.message, status: this.statusCode };
  }
  logError() {
    const jsonMessage = {
      statusCode: this.statusCode,
      message: `${this.name}: ${this.message}`,
      stack: this.stack,
    };
    return JSON.stringify(jsonMessage);
  }
}

module.exports = CustomError;
