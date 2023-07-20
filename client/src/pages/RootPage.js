import { Outlet } from "react-router-dom";
import TopNavBar from "../layouts/TopNavBar";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

function RootPage() {
  const { refreshAuth, isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    if (!isLoggedIn) {
      makeRefreshRequest();
    }
  }, []);

  const makeRefreshRequest = async () => {
    await refreshAuth();
  };
  return (
    <>
      <TopNavBar />
      <Outlet />
    </>
  );
}

export default RootPage;
