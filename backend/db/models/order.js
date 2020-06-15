const mongoose = require('mongoose');
const ORDER_STATUS = require('../../enums/orderStatus');
const ORDER_ITEM_STATUS = require('../../enums/orderItem');
const User = require('./user');

const orderItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: ORDER_ITEM_STATUS.Pending,
      enum: [
        ORDER_ITEM_STATUS.Pending,
        ORDER_ITEM_STATUS.Picked,
        ORDER_ITEM_STATUS.Unavailable,
      ],
    },
  },
  { timestamps: true },
);

const orderSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    customer: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    date: {
      type: Date,
      required: true,
    },
    minBudget: {
      type: Number,
      default: 0,
      min: [0, 'Minimum budget cannot be negative'],
    },
    maxBudget: {
      type: Number,
      min: [0, 'Maximum budget cannot be negative'],
    },
    estimatedPrice: {
      type: Number,
      default: 0,
    },
    estimatedDuration: {
      type: Number,
      default: 0,
    },
    items: [orderItemSchema],
    status: {
      type: String,
      default: ORDER_STATUS.Pending,
      enum: [ORDER_STATUS.Pending, ORDER_STATUS.Picked, ORDER_STATUS.Delivered],
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

orderSchema.post('save', async function (doc, next) {
  try {
    await User.updateMany(
      { $or: [{ _id: doc.customer }, { _id: doc.driver }] },
      { $push: { orders: doc } },
      { new: true },
    );
    next();
  } catch (err) {
    next(err);
  }
});

const Order = new mongoose.model('Order', orderSchema);

module.exports = Order;
