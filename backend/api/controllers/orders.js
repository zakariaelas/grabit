const orderService = require('../../services/orders');

const createOrder = async (req, res, next) => {
  try {
    const customer = req.user.id;
    const orderDTO = req.body;
    const order = await orderService.createOrder({ customer, ...orderDTO });
    return res.json(order);
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const order = await orderService.getOrder(oid);
    return res.json({ order });
  } catch (err) {
    next(err);
  }
};

const patchOrderStatus = async (req, res, next) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
    const order = await orderService.changeOrderStatus(oid, status);
    return res.json({ order });
  } catch (err) {
    next(err);
  }
};

const getOptimizedRoute = async (req, res, next) => {
  try {
    const { id } = req.user;
    const route = await orderService.getOptimizedRoute(id);
    return res.json({ route });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createOrder,
  getOrder,
  patchOrderStatus,
  getOptimizedRoute,
};
