import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContextProvider";
import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import TopNavBar from "../layouts/TopNavBar";
import { cartGetRequest } from "../redux/cartSlice";
import { usersGetRequest } from "../redux/usersSlice";

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
