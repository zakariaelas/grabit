const mongoose = require('mongoose');
const ORDER_ITEM_STATUS = require('../../enums/orderItem');

const orderItemSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: ORDER_ITEM_STATUS.Pending,
    },
  },
  { timestamps: true },
);

const OrderItem = new mongoose.Model('OrderItem', orderItemSchema);

module.exports = OrderItem;
