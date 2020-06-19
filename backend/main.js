const api = require('./api');
const socketIOManager = require('./realtime/');
const config = require('./config');
const logger = require('./utils/logger');

const server = require('http').Server(api);

socketIOManager.initializeSocketIO(server);

require('./realtime/redis-broadcaster');

server.listen(config.port, function () {
  logger.info(`Server is starting on port ${config.port}`);
});
