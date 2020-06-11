const CustomError = require('./CustomError');

class RequestValidationError extends CustomError {
  name = 'RequestValidationError';
  constructor(errors, statusCode = 422, message = 'Unprocessable Entity') {
    super(statusCode, message);
    this.errors = errors;
  }
  serializeError() {
    return {
      status: this.statusCode,
      message: this.errors[0],
    };
  }
  logError() {
    const errorMessages = this.errors.map((err) => ({
      message: err.msg,
      field: err.param,
    }));
    const jsonMessage = {
      statusCode: this.statusCode,
      message: errorMessages,
    };
    return JSON.stringify(jsonMessage);
  }
}

module.exports = RequestValidationError;
