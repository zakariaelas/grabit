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

module.exports = {
  createOrder,
};
