const socketio = require('socket.io');
class SocketIOManager {
  getIO() {
    if (this.io === undefined)
      throw Error(
        'SocketIOManager not initialized - call initializeSocketIO first !',
      );
    return this.io;
  }

  initializeSocketIO(server) {
    this.io = socketio(server, { path: '/api/socket.io' });

    this.io.on('connection', (client) => {
      client.on('client:ping', () => {
        client.emit('server:pong');
      });
    });
  }
}

// Exports a singleton instance of the SocketIOManager class defined above ...
// ... meant to be used for the whole project.
module.exports = new SocketIOManager();
