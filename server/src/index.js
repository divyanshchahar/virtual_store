const express = require("express");
const mongoose = require("mongoose");

const productsRouter = require("./routes/products");

const app = express();

mongoose.connect("mongodb://localhost/virtual_store");

app.listen(3200);

app.use("/products", productsRouter);
