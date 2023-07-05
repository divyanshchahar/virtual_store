import { Outlet } from "react-router-dom";
import TopNavBar from "../layouts/TopNavBar";

function RootPage() {
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  );
}

export default RootPage;
