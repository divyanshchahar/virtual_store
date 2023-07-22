import { Outlet } from "react-router-dom";
import TopNavBar from "../layouts/TopNavBar";
import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import { useSelector } from "react-redux";
import { usersGetRequest } from "../redux/usersSlice";
import { cartGetRequest } from "../redux/cartSlice";

function RootPage() {
  const { refreshAuth, isLoggedIn } = useContext(AuthContext);

  const user = useSelector((state) => state.users);
  const cart = useSelector((state) => state.cart);

  const makeAuthRequest = useMakeAuthRequest();

  // making token refresh request on app loading
  useEffect(() => {
    if (!isLoggedIn) {
      makeRefreshRequest(user, usersGetRequest);
    }
  }, [isLoggedIn]);

  // fetching cart and user on login
  useEffect(() => {
    if (isLoggedIn) {
      makeAuthRequest(user, usersGetRequest);
      makeAuthRequest(cart, cartGetRequest);
    }
  }, [isLoggedIn]);

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
