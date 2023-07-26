import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import usersSlice from "./usersSlice";
import cartSlice from "./cartSlice";

export default configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersSlice,
    cart: cartSlice,
  },
});
