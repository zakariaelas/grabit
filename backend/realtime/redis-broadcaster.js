const redis = require('redis');
const io = require('./index').getIO();
const redisClient = redis.createClient();
const { notificationsChannel } = require('./channels');

redisClient.psubscribe(`${notificationsChannel}*`);

//msg format:
/*
{
  notification: {
    type: 'new-order',
    message: 'You have received a new order !'
    orderId: mongoId,
    pickup: {
      address: '',
      place_id: ''
    },
  }
}
*/

redisClient.on('pmessage', (pchannel, channel, msg) => {
  if (channel.startsWith(notificationsChannel)) {
    const user_id = channel.substring(pchannel.lastIndexOf('#') + 1);
    const notification = JSON.parse(msg);
    io.of('/notifications').to(user_id).emit('notification', notification);
    return;
  }
});

io.of('/notifications').on('connection', (client) => {
  client.on('subscribe', (msg) => {
    client.join(msg.user_id);
  });
  client.on('unsubscribe', (msg) => {
    client.leave(msg.user_id);
  });
});

module.exports = {
  shutdown: () => {
    redisClient.quit();
  },
};
