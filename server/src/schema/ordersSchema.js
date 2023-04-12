const mongoose = require("mongoose");

const cartItems = new mongoose.Schema({
  productId: mongoose.SchemaTypes.ObjectId,
  qty: { type: Number, min: 0 },
});

const ordersSchema = new mongoose.Schema({
  customerId: mongoose.SchemaTypes.ObjectId,
  products: [cartItems],
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model("orders", ordersSchema);
