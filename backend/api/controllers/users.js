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
    } = await userService.createUser(userDTO);
    const token = createToken({ id, role, displayName, imageUrl });
    return res.json({
      id,
      role,
      displayName,
      imageUrl,
      email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
