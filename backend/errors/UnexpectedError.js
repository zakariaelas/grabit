const logger = require('../utils/logger');

class UnexpectedError extends Error {
  constructor(error, statusCode = 500, message = 'Something went wrong') {
    super();
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
    console.error(this);
    //logger.error(this.logError());
  }
  logError() {
    const jsonMessage = {
      statusCode: this.statusCode,
      message: `${this.error.name}: ${this.error.message}`,
      stack: this.error.stack,
    };
    return JSON.stringify(jsonMessage);
  }
  serializeError() {
    return { message: this.message, status: this.statusCode };
  }
}

module.exports = UnexpectedError;
