const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => typeof v === "string",
      message: (props) => `${props.value} is not a string`,
    },
  },
  authId: { type: String, required: true, unique: true },
  address: {
    house: String,
    street: String,
    city: String,
    pin: String,
    country: String,
  },
  payment: {
    nameOnCard: String,
    cardNo: String,
    validFrom: String,
    validUpto: String,
    CVV: String,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  updatedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("users", userSchema);
