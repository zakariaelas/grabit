const db = require('../db');

const createOrder = async (data) => {
  const order = await db.Order.create(data);
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
