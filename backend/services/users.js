const db = require('../db');
const ROLES = require('../enums/roles');
const mapsUtils = require('../utils/maps');

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

const updateLocation = async (id, position) => {
  const user = await db.User.findOneAndUpdate(
    { role: ROLES.Driver, _id: id },
    {
      $set: {
        position: { type: 'Point', coordinates: [position.lng, position.lat] },
      },
    },
    { new: true },
  );
  return user;
};

const getPosition = async (id) => {
  const user = await db.User.findOne({ role: ROLES.Driver, _id: id }).select(
    'position',
  );
  return user.position;
};

const findNearestDriver = async (address) => {
  const location = await mapsUtils.geocode(address);
  const driver = await db.User.findOne({
    role: ROLES.Driver,
    active: true,
    position: {
      $near: {
        $geometry: { type: 'Point', coordinates: [location.lng, location.lat] },
      },
    },
  });
  return driver;
};

module.exports = {
  createUser,
  findFbIdOrCreateUser,
  getUserOrders,
  editProfile,
  changeDriverStatus,
  findNearestDriver,
  updateLocation,
  getPosition,
};
