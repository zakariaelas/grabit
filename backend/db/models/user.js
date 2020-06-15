const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../../enums/roles');

const userSchema = new mongoose.Schema(
  {
    fbId: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    displayName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: ROLES.Customer,
      enum: [ROLES.Customer, ROLES.Driver],
    },
    imageUrl: {
      type: String,
      default: '',
    },
    orders: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
