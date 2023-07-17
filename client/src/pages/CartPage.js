import { usersGetRequest } from "../redux/usersSlice";
import { cartGetRequest } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import NoItemsLayout from "../layouts/NoItemsLayout";
import CartLayout from "../layouts/CartLayout";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const selectedUser = useSelector((state) => state.users.users);

  const products = useSelector((state) =>
    state.products.products.filter((item) => productIds.includes(item._id))
  );

  const productIds = cart?.products?.map((item) => item.productId) || [];

  const { getAccessTokenSilently, user, isAuthenticated, isLoading } =
    useAuth0();
  const dispatch = useDispatch();

  // LOADING USER DETAILS ON RENDER
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
          const authId = user.sub;
          const data = { authId, acessToken };
          dispatch(usersGetRequest(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    setUserOnPageLoad();
  }, [user]);

  // LOADING USER ON RENDER
  useEffect(() => {
    const setCartOnPageLoad = async () => {
      try {
        if (selectedUser._id) {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:carts",
            },
          });

          const customerId = selectedUser._id;
          const data = { acessToken, customerId };

          dispatch(cartGetRequest(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    setCartOnPageLoad();
  }, [selectedUser]);

  return (
    <>
      {cart?.products?.length > 0 ? (
        <CartLayout props={(cart, selectedUser, products)} />
      ) : (
        <NoItemsLayout />
      )}
    </>
  );
}

export default CartPage;
