import { Route, Routes } from "react-router-dom";
import ProductsListPage from "../pages/ProductsListPage";
import SingleProductPage from "../pages/SingleProductPage";
import AccountPage from "../pages/AccountPage";
import RootPage from "../pages/RootPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import RouteProtector from "./RouteProtector";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<ProductsListPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="account"
            element={
              <RouteProtector>
                <AccountPage />
              </RouteProtector>
            }
          />
          <Route
            path="cart"
            element={
              <RouteProtector>
                <CartPage />
              </RouteProtector>
            }
          />
          <Route
            path="orders"
            element={
              <RouteProtector>
                <OrdersPage />
              </RouteProtector>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
