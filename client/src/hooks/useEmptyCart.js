import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { cartEmptyRequest } from "../redux/cartSlice";
import reducerStatus from "../assets/ReducerStatus";

const useEmptyCart = () => {
  const makeAuthRequest = useMakeAuthRequest();
  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (orders.status === reducerStatus.fulfilled) {
      makeAuthRequest(cart, cartEmptyRequest);
      console.log(cart);
    }
  }, [orders]);
};

export default useEmptyCart;

// note : This hooks empties the cart on sucessful placement of order, it sholuld not be used anaywhere apart from the CartLayout
