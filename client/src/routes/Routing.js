import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import RegistrationPage from "../pages/RegistrationPage";
import HomeRootPage from "../pages/HomeRootPage";
import CartPage from "../pages/CartPage";
import OrderHistory from "../pages/OrderHistory";

import { AuthenticationGuard } from "./AuthenticationGuard";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeRootPage />}>
          <Route index element={<HomePage />} />
          <Route path="products/:productId" element={SingleProductPage} />
          <Route
            path="user_registration"
            element={<AuthenticationGuard component={RegistrationPage} />}
          />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="orders"
            element={<AuthenticationGuard component={OrderHistory} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
