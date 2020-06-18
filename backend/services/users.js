const db = require('../db');
const ROLES = require('../enums/roles');

const createUser = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (err) {
    throw err;
  }
};

const editProfile = async (uid, data) => {
  try {
    const user = await db.User.findOneAndUpdate(
      { _id: uid },
      { $set: data },
      { new: true },
    );
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

const changeDriverStatus = async (id, data) => {
  const user = await db.User.findOneAndUpdate(
    { role: ROLES.Driver, _id: id },
    { $set: data },
    { new: true },
  );
  return user;
};

module.exports = {
  createUser,
  findFbIdOrCreateUser,
  getUserOrders,
  editProfile,
  changeDriverStatus,
};
