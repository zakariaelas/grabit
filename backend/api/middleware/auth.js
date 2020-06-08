const passport = require('passport');
const jwt = require('jsonwebtoken');
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const config = require('../../config/');
const ErrorHandler = require('../../utils/ErrorHandler');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: config.jwt.secret,
  },
  (jwt_payload, done) => {
    done(null, jwt_payload);
  },
);

passport.use(jwtStrategy);

const jwtOptions = {
  expiresIn: config.jwt.expirationTime,
};

const createToken = (user) => {
  return jwt.sign(user, config.jwt.secret, jwtOptions);
};

const requireAuthWithPredicate = (pred) => (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, payload) => {
    try {
      if (err) return next(err);
      if (!payload) return next(401, 'Please log in first !');
      const { id } = payload;
      const user = await db.User.findById(id);
      const predCheck = await pred.check(user, req);
      if (predCheck) {
        req.user = user;
        return next();
      } else return next(new ErrorHandler(403, pred.message));
    } catch (e) {
      next(e);
    }
  })(req, res, next);
};

module.exports = {
  createToken,
  requireAuthWithPredicate,
  loginRequired: requireAuthWithPredicate({ check: () => true }),
  ensureCorrectUser: requireAuthWithPredicate({
    check: (user, req) => user._id.toString() === req.params.id,
    message: 'Needs permission !',
  }),
};