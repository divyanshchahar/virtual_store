import { getUsersApi } from "../redux/usersSlice";
import { getCartApi, updateCartApi } from "../redux/cartSlice";
import { createOrdersApi } from "../redux/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import NoItemsLayout from "../layouts/NoItemsLayout";

function CartPage() {
  const cart = useSelector((state) => state.cart.cart);
  const selectedUser = useSelector((state) => state.users.users);

  const productIds = cart?.products?.map((item) => item.productId) || [];

  const products = useSelector((state) =>
    state.products.products.filter((item) => productIds.includes(item._id))
  );

  const { getAccessTokenSilently, user, isAuthenticated, isLoading } =
    useAuth0();
  const dispatch = useDispatch();

  // loading user details on render
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
          dispatch(getUsersApi(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    setUserOnPageLoad();
  }, [user]);

  // loading cart on render
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

          dispatch(getCartApi(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    setCartOnPageLoad();
  }, [selectedUser]);

  // function to add items to cart (PUT request)
  const addToCart = async (productId) => {
    const [itemPresent] = cart.products.filter(
      (item) => item.productId === productId
    );

    const acessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "write:carts",
      },
    });

    const data = {
      acessToken: acessToken,
      cartData: {
        customerId: selectedUser._id,
        productId: productId,
        qty: itemPresent.qty + 1,
      },
    };

    dispatch(updateCartApi(data));
  };

  // function to remove items from cart (PUT request)
  const removeFromCart = async (productId) => {
    const [itemPresent] = cart.products.filter(
      (item) => item.productId === productId
    );

    const acessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "write:carts",
      },
    });

    const data = {
      acessToken: acessToken,
      cartData: {
        customerId: selectedUser._id,
        productId: productId,
        qty: itemPresent.qty - 1,
      },
    };

    dispatch(updateCartApi(data));
  };

  // funtion to place orders
  const createOrder = async () => {
    //placing orders

    const acessTokenOrder = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "write:orders",
      },
    });

    const orderData = {
      customerId: selectedUser._id,
      products: cart.products.map((item) => {
        return { productId: item.productId, qty: item.qty };
      }),
    };

    dispatch(
      createOrdersApi({ orderData: orderData, acesstoken: acessTokenOrder })
    );

    //emptying cart

    const acessTokenCart = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "write:carts",
      },
    });

    orderData.products.forEach((item) => {
      const cartData = {
        customerId: selectedUser._id,
        productId: item.productId,
        qty: 0,
      };

      dispatch(
        updateCartApi({ acessToken: acessTokenCart, cartData: cartData })
      );
    });
  };

  return (
    <>
      {cart?.products?.length > 0 ? (
        <>
          <h1 className="text-center mt-5">Cart</h1>
          {products.map((item) => {
            return (
              <div className="container-fluid p-3" key={item._id}>
                <div className="d-flex flex-wrap justify-content-start gap-5 border p-3">
                  <img
                    src={item.images[0]}
                    style={{ width: "20rem", height: "20rem" }}
                    className="object-fit-contain"
                    alt={item.name}
                  />

                  <div style={{ maxWidth: "65rem" }}>
                    <h4>{item.name}</h4>
                    {Object.entries(item).map((item) => {
                      if (
                        item[0] !== "name" &&
                        item[0] !== "price" &&
                        item[0] !== "_id" &&
                        item[0] !== "images"
                      ) {
                        return <p>{`${item[0]} : ${item[1]}`}</p>;
                      }
                    })}
                    <h6>{`Price: $ ${item.price}`}</h6>
                    <div className="btn-group align-items-center">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          addToCart(item._id);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          removeFromCart(item._id);
                        }}
                      >
                        -
                      </button>
                    </div>

                    <p>{`Qty: ${
                      cart.products.find(
                        (cartItem) => cartItem.productId === item._id
                      ).qty
                    }`}</p>

                    <h4>
                      {`Subtotal: $ ${(
                        cart.products.find(
                          (cartItem) => cartItem.productId === item._id
                        ).qty * item.price
                      ).toFixed(2)}`}
                    </h4>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="container-fluid p-3">
            <div className="d-flex border p-3">
              <h5>{`Total : $ ${cart.products.reduce((total, cartItem) => {
                return (
                  total +
                  cartItem.qty *
                    products.find(
                      (productItem) => productItem._id === cartItem.productId
                    ).price
                );
              }, 0)}`}</h5>
            </div>
          </div>
          <div className="d-grid p-3">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                createOrder();
              }}
            >
              {" "}
              Buy Now
            </button>
          </div>
        </>
      ) : (
        <NoItemsLayout />
      )}
    </>
  );
}

export default CartPage;
