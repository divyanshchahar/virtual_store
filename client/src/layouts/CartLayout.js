import { cartPutRequest } from "../redux/cartSlice";
import { ordersPostRequest } from "../redux/ordersSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

function CartLayout({ cart, selectedUser, products }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  // FUNCTION TO ADD ITEMS TO CART
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

    dispatch(cartPutRequest(data));
  };

  // FUNCTION TO REMOVE ITEMS FROM CART (PUT request)
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

    dispatch(cartPutRequest(data));
  };

  // FUNCTION TO PLACE ORDERS
  const createOrder = async () => {
    //PLACING ORDERS

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
      ordersPostRequest({ acesstoken: acessTokenOrder, orderData: orderData })
    );

    //EMPTYING CART ON SUCESSFUL PLACEMENT OF ORDER

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
        cartPutRequest({ acessToken: acessTokenCart, cartData: cartData })
      );
    });
  };

  return (
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
          Buy Now
        </button>
      </div>
    </>
  );
}

export default CartLayout;
