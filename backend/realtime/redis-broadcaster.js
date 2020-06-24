const redis = require('redis');
const io = require('./index').getIO();
const redisClient = redis.createClient();
const redisPublisher = redis.createClient();
const { notificationsChannel, locationChannel } = require('./channels');
const userService = require('../services/users');
const db = require('../db');

redisClient.psubscribe(`${notificationsChannel}*`);
redisClient.psubscribe(`${locationChannel}*`);

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

redisClient.on('pmessage', async (pchannel, channel, msg) => {
  if (channel.startsWith(notificationsChannel)) {
    const user_id = channel.substring(pchannel.lastIndexOf('#') + 1);
    const notification = JSON.parse(msg);
    io.of('/notifications').to(user_id).emit('notification', notification);
  } else if (channel.startsWith(locationChannel)) {
    const user_id = channel.substring(pchannel.lastIndexOf('#') + 1);
    const { position } = JSON.parse(msg);
    await userService.updateLocation(user_id, position);
  }
  return;
});

io.of('/notifications').on('connection', (client) => {
  client.on('subscribe', (msg) => {
    client.join(msg.user_id);
  });
  client.on('unsubscribe', (msg) => {
    client.leave(msg.user_id);
  });
});

io.of('/location').on('connection', (client) => {
  client.on('subscribe', (msg) => {
    client.join(msg.user_id);
  });
  client.on('unsubscribe', (msg) => {
    client.leave(msg.user_id);
  });
  client.on('new_position', (msg) => {
    redisPublisher.publish(
      `${locationChannel}${msg.user_id}`,
      JSON.stringify(msg),
    );
  });
});

module.exports = {
  shutdown: () => {
    redisClient.quit();
  },
};
