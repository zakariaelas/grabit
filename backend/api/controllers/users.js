const userService = require('../../services/users');
const { createToken } = require('../middleware/auth');

const createUser = async (req, res, next) => {
  try {
    const userDTO = req.body;
    console.log(userDTO);
    const {
      _id: id,
      displayName,
      role,
      imageUrl,
      email,
      phoneNumber,
    } = await userService.createUser(userDTO);
    const token = createToken({ id, role, displayName, imageUrl, phoneNumber });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
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

module.exports = {
  createUser,
  getUserOrders,
};
