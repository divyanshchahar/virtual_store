import { useSelector } from "react-redux";
import { cartPutRequest, cartPostRequest } from "../redux/cartSlice";
import useMakeAuthRequest from "./useMakeAuthRequest";

function useOperateCart() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.users.users);
  const makeAuthRequest = useMakeAuthRequest();

  const addItem = (productId) => {
    // if user is logged in
    if (user?._id) {
      // if user has a cart
      if (cart.cart?.customerId) {
        const itemPresent = cart.cart?.products.filter(
          (item) => item.productId === productId
        );

        // if item is present in the cart
        if (itemPresent.length > 0) {
          makeAuthRequest(cart, cartPutRequest, {
            customerId: user._id,
            productId: productId,
            qty: itemPresent[0].qty + 1,
          });
        }

        // if item is not present
        else {
          makeAuthRequest(cart, cartPutRequest, {
            customerId: user._id,
            productId: productId,
            qty: 1,
          });
        }
      }
      // if user does not have a cart
      else {
        makeAuthRequest(cart, cartPostRequest, {
          customerId: user._id,
          productId: productId,
          qty: 1,
        });
      }
    } else {
      alert("Plaease sign in to add or remove items from cart");
    }
  };

  const removeItem = (productId) => {
    if (user?._id) {
      // if user has a cart
      if (cart.cart?.customerId) {
        const itemPresent = cart.cart?.products.filter(
          (item) => item.productId === productId
        );

        // if item is present in the cart
        if (itemPresent.length > 0) {
          makeAuthRequest(cart, cartPutRequest, {
            customerId: user._id,
            productId: productId,
            qty: itemPresent[0].qty - 1,
          });
        }

        // if item is not present in the cart
        else {
          alert("product does not eixsts in cart");
        }
      }
      // if user does not have a cart
      else {
        alert("product does not eixsts in cart");
      }
    } else {
      alert("Plaease sign in to add or remove items from cart");
    }
  };

  return { addItem, removeItem };
}

export default useOperateCart;
