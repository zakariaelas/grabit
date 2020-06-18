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
      message: this.errors[0].message,
    };
  }
}

module.exports = RequestValidationError;
