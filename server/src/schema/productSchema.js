const mongoose = require("mongoose");

const productSchema = {
  name: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  images: [{ type: String }],
};

module.exports = mongoose.model("products", productSchema);
