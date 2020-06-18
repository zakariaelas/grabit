const userService = require('../../services/users');
const { createToken } = require('../middleware/auth');

const createUser = async (req, res, next) => {
  try {
    const userDTO = req.body;
    const {
      _id: id,
      displayName,
      role,
      imageUrl,
      email,
      phoneNumber,
      active,
    } = await userService.createUser(userDTO);
    const token = createToken({
      id,
      role,
      displayName,
      imageUrl,
      phoneNumber,
      email,
      active,
    });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
      active,
      phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const { id } = req.user;
    const orders = await userService.getUserOrders(id);
    return res.json({ orders });
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const userDTO = req.body;
    const {
      _id: id,
      displayName,
      role,
      imageUrl,
      email,
      active,
      phoneNumber,
    } = await userService.editProfile(uid, userDTO);
    const token = createToken({
      id,
      role,
      displayName,
      imageUrl,
      phoneNumber,
      email,
      active,
    });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
      active,
      phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

const patchDriverStatus = async (req, res, next) => {
  try {
    const statusDTO = req.body;
    const { uid } = req.params;
    const {
      _id: id,
      displayName,
      role,
      imageUrl,
      email,
      phoneNumber,
      active,
    } = await userService.changeDriverStatus(uid, statusDTO);
    const token = createToken({
      id,
      role,
      displayName,
      imageUrl,
      phoneNumber,
      email,
      active,
    });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
      active,
      phoneNumber,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUserOrders,
  editProfile,
  patchDriverStatus,
};
