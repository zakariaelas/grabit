const ErrorHandler = require('../../utils/ErrorHandler');

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    const { statusCode, message } = err;
    res.status(statusCode).json({ error: { message, status: statusCode } });
  } else {
    res
      .status(400)
      .json({ error: { message: 'Something went wrong !', status: 400 } });
  }
};

module.exports = errorHandler;
