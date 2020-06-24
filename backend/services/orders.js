const db = require('../db');
const ROLES = require('../enums/roles');
const { NoDriverAvailableError } = require('../errors');
const { findNearestDriver, getPosition } = require('./users');
const mapsUtils = require('../utils/maps');
const ORDER_STATUS = require('../enums/orderStatus');
const redisClient = require('redis').createClient();
const { notificationsChannel } = require('../realtime/channels');
const moment = require('moment');

const createOrder = async (data) => {
  const driver = await findNearestDriver(data.from.address);
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
  const order = await db.Order.findOne({ _id: id })
    .populate({
      path: 'customer',
      select: 'displayName imageUrl phoneNumber',
    })
    .populate({
      path: 'driver',
      select: 'displayName imageUrl phoneNumber',
    });
  return order;
};

const changeOrderStatus = async (id, status) => {
  const order = await db.Order.findOneAndUpdate(
    { _id: id },
    { $set: { status } },
    { new: true },
  );
  const message = {
    type: 'order-status',
    message: `Your order has been ${order.status}`,
    orderId: order._id,
    pickup: order.from,
    destination: order.destination,
  };
  redisClient.publish(
    `${notificationsChannel}${order.customer}`,
    JSON.stringify(message),
  );
  return order;
};

const getOptimizedRoute = async (id) => {
  const { coordinates } = await getPosition(id);
  const orders = await db.Order.find({
    driver: id,
    date: moment().subtract(1, 'day').startOf('day').toDate(),
    status: ORDER_STATUS.Pending,
  });
  if (orders.length === 0) return orders;
  const pickupPoints = [
    { lat: coordinates[1], lng: coordinates[0] },
    ...orders.map((order) => order.from.address),
  ];
  let pickup_path = (await mapsUtils.getOptimizedPath(pickupPoints, 0)).map(
    (index) => orders[index - 1],
  );
  const deliveryPoints = [
    pickup_path[pickup_path.length - 1].from.address,
    ...orders.map((order) => order.destination.address),
  ];
  const delivery_path = (
    await mapsUtils.getOptimizedPath(deliveryPoints, 0)
  ).map((index) => ({
    id: orders[index - 1].id,
    address: orders[index - 1].destination.address,
  }));
  const route = pickup_path
    .map((order) => ({ id: order.id, address: order.from.address }))
    .concat(delivery_path);
  return route;
};

module.exports = {
  createOrder,
  getOrder,
  changeOrderStatus,
  getOptimizedRoute,
};
