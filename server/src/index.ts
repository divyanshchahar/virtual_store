import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cartRouter from "./routes/cartRoute";
import changePasswordRouter from "./routes/changePasswordRoute";
import emptyCartRouter from "./routes/emptyCartRoute";
import loginRouter from "./routes/loginRoute";
import logoutRouter from "./routes/logoutRoute";
import ordersRouter from "./routes/ordersRoute";
import productsRouter from "./routes/productsRoute";
import refreshTokenRouter from "./routes/refreshTokenRoute";
import signUpRouter from "./routes/signUpRoute";
import userRouter from "./routes/userRoute";

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
app.use("/changepassword", changePasswordRouter);
app.use("/emptycart", emptyCartRouter);

app.listen(3200);
