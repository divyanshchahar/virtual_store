const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRouter = require("./routes/productsRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const ordersRouter = require("./routes/ordersRoute");

const app = express();

const corsOption = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

mongoose.connect(process.env.DATABASE);

app.use(express.json());
app.use(cors(corsOption));

app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);

app.listen(3200);
