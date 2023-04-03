import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SingleProductPage from "../pages/SingleProductPage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="products/:productId" element={<SingleProductPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default Routing;
