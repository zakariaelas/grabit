const { createToken } = require('../middleware/auth');
const authService = require('../../services/auth');
const userService = require('../../services/users');

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // The call to authUser will throw an error if credentials do not match.
    let {
      _id: id,
      role,
      imageUrl,
      displayName,
      phoneNumber,
      active,
    } = await authService.authUser(email, password);

    let token = createToken({
      id,
      role,
      email,
      phoneNumber,
      displayName,
      imageUrl,
      active,
    });

    return res.status(200).json({
      id,
      role,
      email,
      imageUrl,
      phoneNumber,
      displayName,
      token,
      active,
    });
  } catch (err) {
    return next(err);
  }
};

const facebookLogin = async (req, res, next) => {
  try {
    const { accessToken, fbId, role: userRole } = req.body;

    // if verification fails, an error will be thrown.
    const fbData = await authService.verifyAccessToken(accessToken, fbId);

    let {
      _id: id,
      displayName,
      imageUrl,
      email,
      role,
      active,
      phoneNumber,
    } = await userService.findFbIdOrCreateUser({
      role: userRole,
      ...fbData,
    });

    const token = createToken({
      id,
      displayName,
      phoneNumber,
      email,
      imageUrl,
      role,
      active,
    });

    return res.json({
      id,
      email,
      displayName,
      imageUrl,
      role,
      active,
      token,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
  facebookLogin,
};
