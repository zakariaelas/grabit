const db = require('../db');
const ROLES = require('../enums/roles');
const { NoDriverAvailableError } = require('../errors');
const redisClient = require('redis').createClient();
const { notificationsChannel } = require('../realtime/channels');

const createOrder = async (data) => {
  const driver = await db.User.findOne({ role: ROLES.Driver, active: true });
  if (!driver) throw new NoDriverAvailableError();
  const order = await db.Order.create({ driver: driver._id, ...data });
  const message = {
    type: 'new-order',
    message: 'You have received a new order !',
    orderId: order._id,
    pickup: order.from,
    destination: order.destination,
  };
  redisClient.publish(
    `${notificationsChannel}${order.driver._id}`,
    JSON.stringify(message),
  );
  return order;
};

const getOrder = async (id) => {
  const order = await db.Order.findOne({ _id: id });
  return order;
};

module.exports = {
  createOrder,
  getOrder,
};
