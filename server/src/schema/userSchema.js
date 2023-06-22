const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    house: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  payments: {
    nameOnCard: {
      type: String,
      required: true,
    },
    cardNo: {
      type: String,
      required: true,
    },
    validFrom: {
      type: String,
      required: true,
    },
    validUpto: {
      type: String,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("users", userSchema);
