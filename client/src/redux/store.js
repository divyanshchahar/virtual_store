import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import usersSlice from "./usersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    orders: ordersReducer,
    users: usersSlice,
  },
});

export default store;
