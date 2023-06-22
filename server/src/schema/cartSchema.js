const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true,
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.SchemaTypes.ObjectId, required: true },
      qty: { type: Number, min: 0, required: true },
    },
  ],
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

module.exports = mongoose.model("cart", cartSchema);
