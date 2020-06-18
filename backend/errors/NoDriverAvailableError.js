const CustomError = require('./CustomError');

class NoDriverAvailableError extends CustomError {
  name = 'NoDriverAvailableError';
  constructor(
    statusCode = 401,
    message = 'No driver available, please try again later',
  ) {
    super(statusCode, message);
  }
}

module.exports = NoDriverAvailableError;
