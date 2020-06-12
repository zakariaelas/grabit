const mongoose = require('mongoose');
const ORDER_STATUS = require('../../enums/orderStatus');

const orderSchema = mongoose.Schema(
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
      reqiured: true,
    },
    destination: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    minBugdet: {
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
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true,
      },
    ],
    status: {
      type: String,
      default: ORDER_STATUS.Pending,
      enum: [
        ORDER_STATUS.Pending,
        ORDER_STATUS.Accepted,
        ORDER_STATUS.Picked,
        ORDER_STATUS.Delivered,
        ORDER_STATUS.Rejected,
      ],
    },
    deliveredAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const Order = new mongoose.Model('Order', orderSchema);

module.exports = Order;
