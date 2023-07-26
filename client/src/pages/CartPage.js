import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReducerStatus from "../assets/ReducerStatus";
import CartLayout from "../layouts/CartLayout";
import ErrorLayout from "../layouts/ErrorLayout";
import LoadingLayout from "../layouts/LoadingLayout";
import NoItemsLayout from "../layouts/NoItemsLayout";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products.products);

  const [cartData, setCartData] = useState([]);

  // processing data for cart layout on render
  useEffect(() => {
    if (
      cart.status === ReducerStatus.fulfilled &&
      cart.cart?.products?.length > 0
    ) {
      const productIds = cart.cart.products.map((item) => item.productId);

      const filteredProducts = products.filter((item) =>
        productIds.includes(item._id)
      );

      let processedData = [];

      filteredProducts.forEach((filteredProductItem) => {
        cart.cart.products.map((cartItem) => {
          if (cartItem.productId === filteredProductItem._id) {
            processedData.push({ ...filteredProductItem, qty: cartItem.qty });
          }
        });
      });

      setCartData(processedData);
    }
  }, [cart]);

  return (
    <>
      {cart.status === ReducerStatus.pending ? <LoadingLayout /> : <></>}

      {cart.status === ReducerStatus.rejected ? <ErrorLayout /> : <></>}

      {cart.cart?.products?.length > 0 && cartData.length > 0 ? (
        <CartLayout cartData={cartData} />
      ) : (
        <></>
      )}

      {cart.cart?.products?.length > 0 && !cartData.length > 0 ? (
        <LoadingLayout />
      ) : (
        <></>
      )}

      {cart.cart?.products?.length === 0 ? <NoItemsLayout /> : <></>}
    </>
  );
}

export default CartPage;
