import mongoose, { Mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  images: [{ type: String }],
});

export const Products = mongoose.model("products", productSchema);
