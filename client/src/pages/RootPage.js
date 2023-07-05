import { Outlet } from "react-router-dom";
import TopNavBar from "../layouts/TopNavBar";

function HomeRootPage() {
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  );
}

export default HomeRootPage;
