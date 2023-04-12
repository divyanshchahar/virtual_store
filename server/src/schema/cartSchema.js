const mongoose = require("mongoose");

const cartItems = new mongoose.Schema({
  productId: mongoose.SchemaTypes.ObjectId,
  qty: { type: Number, min: 0 },
});

const cartSchema = new mongoose.Schema({
  customerId: { type: mongoose.SchemaTypes.ObjectId, unique: true },
  products: [cartItems],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("carts", cartSchema);
