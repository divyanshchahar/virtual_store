import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import productsReducer from "./productsSlice";
import ordersReducer from "./ordersSlice";
import usersSlice from "./usersSlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  users: usersSlice,
  cart: cartSlice,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
