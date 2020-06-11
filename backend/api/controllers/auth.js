const { createToken } = require('../middleware/auth');
const authService = require('../../services/auth');
const userService = require('../../services/users');

const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    // The call to authUser will throw an error if credentials do not match.
    let { _id: id, role, imageUrl, displayName } = await authService.authUser(
      email,
      password,
    );

    let token = createToken({
      id,
      role,
      displayName,
      imageUrl,
    });

    return res.status(200).json({
      id,
      role,
      email,
      imageUrl,
      displayName,
      token,
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
    } = await userService.findFbIdOrCreateUser({
      userRole,
      ...fbData,
    });

    const token = createToken({
      id,
      displayName,
      imageUrl,
      role,
    });

    return res.json({
      id,
      email,
      displayName,
      imageUrl,
      role,
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
