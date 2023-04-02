import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

function Routing() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default Routing;
