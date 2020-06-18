const db = require('../db');
const ROLES = require('../enums/roles');
const { NoDriverAvailableError } = require('../errors');

const createOrder = async (data) => {
  const driver = await db.User.findOne({ role: ROLES.Driver, active: true });
  if (!driver) throw new NoDriverAvailableError();
  const order = await db.Order.create({ driver, ...data });
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
