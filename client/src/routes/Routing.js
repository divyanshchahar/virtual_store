import { Route, Routes } from "react-router-dom";
import ProductsListPage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import AccountPage from "../pages/AccountPage";
import RootPage from "../pages/RootPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";

import { AuthenticationGuard } from "./AuthenticationGuard";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootPage />}>
          <Route index element={<ProductsListPage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route
            path="account"
            element={<AuthenticationGuard component={AccountPage} />}
          />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="orders"
            element={<AuthenticationGuard component={OrdersPage} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
