const db = require('../db');

const createUser = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (err) {
    throw err;
  }
};

const findFbIdOrCreateUser = async (data) => {
  try {
    let user = await db.User.findOne({ fbId: data.fbId });
    if (!user) {
      user = await db.User.create(data);
    }
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserOrders = async (id) => {
  const user = await db.User.findOne({ _id: id })
    .populate('orders')
    .select('orders');
  return user.orders;
};

module.exports = {
  createUser,
  findFbIdOrCreateUser,
  getUserOrders,
};
