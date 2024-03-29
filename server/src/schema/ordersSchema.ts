import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  customerId: mongoose.SchemaTypes.ObjectId,
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
});

export const Orders = mongoose.model("orders", ordersSchema);
