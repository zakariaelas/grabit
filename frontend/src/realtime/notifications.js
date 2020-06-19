import io from 'socket.io-client';

let notificationsSocket = null;

export function notify(user_id, callback) {
  const socketIoUrl = `${window.location.origin}`;
  notificationsSocket = io.connect(`${socketIoUrl}/notifications`, {
    path: `${process.env.PUBLIC_URL}/api/socket.io`,
  });
  notificationsSocket.emit('subscribe', { user_id });
  notificationsSocket.on('notification', (msg) => {
    callback(msg);
  });
  function disconnect() {
    notificationsSocket.emit('unsubscribe', { user_id });
    return notificationsSocket.removeAllListeners();
  }
  return disconnect;
}
