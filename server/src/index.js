const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productsRouter = require("./routes/productsRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const ordersRouter = require("./routes/ordersRoute");
const signUpRouter = require("./routes/signUpRoute");
const loginRouter = require("./routes/loginRoute");
const refreshTokenRouter = require("./routes/refreshTokenRoute");
const logoutRouter = require("./routes/logoutRoute");

require("dotenv").config();

const app = express();

const corsOption = {
  origin: process.env.ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

mongoose.connect(process.env.DATABASE).catch((error) => {
  console.log(error);
});

app.use("/products", productsRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/refreshToken", refreshTokenRouter);
app.use("/logout", logoutRouter);

app.listen(3200);
