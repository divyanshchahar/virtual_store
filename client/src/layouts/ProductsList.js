import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { getUsers } from "../redux/usersSlice";
import { getCartApi, createCartApi, updateCartApi } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProductsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getAccessTokenSilently, user, isAuthenticated, isLoading } =
    useAuth0();

  const products = useSelector((state) => state.products);
  const selectedUser = useSelector((state) => state.users.users);
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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

          dispatch(getUsers(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    setUserOnPageLoad();
  }, [user]);

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

  const addToCart = async (productId) => {
    // user loggedin and registered
    if (selectedUser?._id) {
      const acessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "write:carts",
        },
      });

      // if user has a cart
      if (typeof cart === "object") {
        const itemPresent = cart.products.filter(
          (item) => item.productId === productId
        );

        // if item is availible in cart
        if (itemPresent.length > 0) {
          const data = {
            acessToken: acessToken,
            cartData: {
              customerId: selectedUser._id,
              productId: productId,
              qty: itemPresent[0].qty + 1,
            },
          };

          dispatch(updateCartApi(data));
        } else {
          // put request with qty:1

          const data = {
            acessToken: acessToken,
            cartData: {
              customerId: selectedUser._id,
              productId: productId,
              qty: 1,
            },
          };

          dispatch(updateCartApi(data));
        }
      } else {
        const data = {
          acessToken: acessToken,
          cartData: {
            customerId: selectedUser._id,
            productId: productId,
            qty: 1,
          },
        };

        dispatch(createCartApi(data));
      }
    } else {
      alert("Please login and register user details");
    }
  };

  const removeFromCart = async (productId) => {
    if (selectedUser?._id) {
      if (cart) {
        const [isProduct] = cart.products.filter(
          (item) => item.productId === productId
        );

        if (isProduct) {
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
              qty: isProduct.qty - 1,
            },
          };
          dispatch(updateCartApi(data));
        } else {
          alert("This product does not exists in cart");
        }
      } else {
        alert("Opps! No cart exists");
      }
    } else {
      alert("Please login and register user details");
    }
  };

  return (
    <>
      {products.status === "idle" && (
        <div className="container m-auto my-5">
          <h1>No products to display</h1>
        </div>
      )}

      {products.status === "pending" && (
        <div className="container m-auto my-5" style={{ width: "fit-content" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {products.status === "rejected" && (
        <div className="container m-auto my-5">
          <h3>{products.error}</h3>
        </div>
      )}

      {products.status === "sucess" && (
        <div className="container d-flex justify-content-around flex-wrap gap-3 p-3">
          {products.products.map((item) => {
            return (
              <div
                className="card text-center"
                style={{ width: "15rem" }}
                key={item._id}
              >
                <div className="ratio ratio-1x1">
                  <img
                    src={item.images[0]}
                    className="card-image-top object-fit-contain"
                    alt={`${item.name}`}
                    onClick={() => {
                      navigate(`products/${item._id}`);
                    }}
                  />
                </div>

                <div className="card-body">
                  <p className="card-text">
                    {item.name.length > 25
                      ? `${item.name.substring(0, 20)}...`
                      : item.name}
                  </p>

                  <div className="btn-group">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        addToCart(item._id);
                      }}
                    >
                      <i class="bi bi-bag-plus"></i>
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        removeFromCart(item._id);
                      }}
                    >
                      <i class="bi bi-bag-dash"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ProductsList;
