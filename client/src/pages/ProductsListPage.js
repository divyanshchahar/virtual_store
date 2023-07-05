import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsApi } from "../redux/productsSlice";
import { usersGetRequest } from "../redux/usersSlice";
import {
  cartGetRequest,
  cartPostRequest,
  cartPutRequest,
} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ErrorLayout from "./ErrorLayout";
import LoadingLayout from "./LoadingLayout";
import NoItemsLayout from "./NoItemsLayout";
import reducerStatus from "../assets/ReducerStatus";
import ProductsListLayout from "../layouts/ProductsListLayout";

function ProductsListPage() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } =
    useAuth0();

  const products = useSelector((state) => state.products);
  const selectedUser = useSelector((state) => state.users.users);
  const cart = useSelector((state) => state.cart.cart);

  // rendering products on page load
  useEffect(() => {
    dispatch(getProductsApi());
  }, []);

  // setting user state(global) on page load
  useEffect(() => {
    const setUserOnPageLoad = async () => {
      try {
        if (isAuthenticated && !isLoading) {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:users",
            },
          });

          dispatch(
            usersGetRequest({ authId: user?.sub, acessToken: acessToken })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    setUserOnPageLoad();
  }, [user]);

  // setting cart state (global) on page load
  useEffect(() => {
    const setCartOnPageLoad = async () => {
      try {
        if (selectedUser?._id) {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:carts",
            },
          });

          dispatch(
            cartGetRequest({
              acessToken: acessToken,
              customerId: selectedUser?._id,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    setCartOnPageLoad();
  }, [selectedUser]);

  return (
    <>
      {products.status === reducerStatus.idle && <NoItemsLayout />}

      {products.status === reducerStatus.pending && <LoadingLayout />}

      {products.status === reducerStatus.rejected && <ErrorLayout />}

      {products.status === reducerStatus.fulfilled && (
        <ProductsListLayout porps={(products, selectedUser, cart)} />
      )}
    </>
  );
}

export default ProductsListPage;
