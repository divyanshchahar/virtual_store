const express = require("express");
const mongoose = require("mongoose");

const productsRouter = require("./routes/products");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const ordersRouter = require("./routes/ordersRoute");

const app = express();

mongoose.connect("mongodb://localhost/virtual_store");

app.listen(3200);

app.use(express.json());

app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/orders", ordersRouter);
