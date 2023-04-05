import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";
import RegistrationPage from "../pages/RegistrationPage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
          <Route path="user_registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
