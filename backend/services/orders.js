const db = require('../db');

const createOrder = async (data) => {
  const order = await db.Order.create(data);
  return order;
};

module.exports = {
  createOrder,
};
