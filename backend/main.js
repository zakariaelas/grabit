const api = require('./api');
const config = require('./config');
const logger = require('./utils/logger');

// later on, this will be useful when we add socket.io
// because socket.io needs a server instance to "attach" itself into.
const server = require('http').Server(api);

server.listen(config.port, function () {
  logger.info(`Server is starting on port ${config.port}`);
});
