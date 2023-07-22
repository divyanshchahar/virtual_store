import { useNavigate } from "react-router-dom";
import { cartPutRequest, cartPostRequest } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

function ProductsListLayout({ products }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  // // FUNCTION TO ADD ITEMS TO CART
  // const addToCart = async (productId) => {
  //   // user loggedin and registered
  //   if (selectedUser?._id) {
  //     const acessToken = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: process.env.REACT_APP_AUDIENCE,
  //         scope: "write:carts",
  //       },
  //     });

  //     // if user has a cart
  //     if (typeof cart === "object") {
  //       const itemPresent = cart.products.filter(
  //         (item) => item.productId === productId
  //       );

  //       // if item is availible in cart
  //       if (itemPresent.length > 0) {
  //         const cartData = {
  //           customerId: selectedUser._id,
  //           productId: productId,
  //           qty: itemPresent[0].qty + 1,
  //         };

  //         dispatch(
  //           cartPutRequest({ acessToken: acessToken, cartData: cartData })
  //         );
  //       } else {
  //         // put request with qty:1

  //         const data = {
  //           acessToken: acessToken,
  //           cartData: {
  //             customerId: selectedUser._id,
  //             productId: productId,
  //             qty: 1,
  //           },
  //         };

  //         dispatch(cartPutRequest(data));
  //       }
  //     } else {
  //       const cartData = {
  //         customerId: selectedUser._id,
  //         productId: productId,
  //         qty: 1,
  //       };

  //       dispatch(
  //         cartPostRequest({ acessToken: acessToken, cartData: cartData })
  //       );
  //     }
  //   } else {
  //     alert("Please login and register user details");
  //   }
  // };

  // // FUNCTION TO REMOVE ITEMS FROM CART
  // const removeFromCart = async (productId) => {
  //   if (selectedUser?._id) {
  //     if (cart) {
  //       const [isProduct] = cart.products.filter(
  //         (item) => item.productId === productId
  //       );

  //       if (isProduct) {
  //         const acessToken = await getAccessTokenSilently({
  //           authorizationParams: {
  //             audience: process.env.REACT_APP_AUDIENCE,
  //             scope: "write:carts",
  //           },
  //         });

  //         const cartData = {
  //           customerId: selectedUser._id,
  //           productId: productId,
  //           qty: isProduct.qty - 1,
  //         };

  //         dispatch(
  //           cartPutRequest({ acessToken: acessToken, cartData: cartData })
  //         );
  //       } else {
  //         alert("This product does not exists in cart");
  //       }
  //     } else {
  //       alert("Opps! No cart exists");
  //     }
  //   } else {
  //     alert("Please login and register user details");
  //   }
  // };

  return (
    <div className="container d-flex justify-content-around flex-wrap gap-3 p-3">
      {products.map((item) => {
        return (
          <div
            className="card text-center"
            style={{ width: "15rem" }}
            key={item._id}
          >
            <img
              src={item.images[0]}
              className="card-image-top object-fit-contain"
              alt={`${item.name}`}
              style={{ height: "15rem" }}
              onClick={() => {
                navigate(`products/${item._id}`);
              }}
            />

            <div className="card-body">
              <p className="card-text">
                {item.name.length > 25
                  ? `${item.name.substring(0, 20)}...`
                  : item.name}
              </p>

              <div className="btn-group">
                {/* <button
                  className="btn btn-primary"
                  onClick={() => {
                    addToCart(item._id);
                  }}
                >
                  <i class="bi bi-bag-plus"></i>
                </button> */}
                <button className="btn btn-primary">
                  <i class="bi bi-bag-plus"></i>
                </button>
                {/* <button
                  className="btn btn-primary"
                  onClick={() => {
                    removeFromCart(item._id);
                  }}
                >
                  <i class="bi bi-bag-dash"></i>
                </button> */}
                <button className="btn btn-primary">
                  <i class="bi bi-bag-dash"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsListLayout;
