const orderService = require('../../services/orders');
const ForbiddenError = require('../../errors');

const ensureCorrectOrderUser = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { id: uid } = req.user;
    const order = await orderService.getOrder(oid);
    if (order.customer === uid || order.driver === uid) return next();
    return next(new ForbiddenError());
  } catch (err) {
    next(err);
  }
};

module.exports = {
  ensureCorrectOrderUser,
};
