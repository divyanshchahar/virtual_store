import { useEffect } from "react";
import { useSelector } from "react-redux";
import reducerStatus from "../assets/ReducerStatus";
import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import ErrorLayout from "../layouts/ErrorLayout";
import LoadingLayout from "../layouts/LoadingLayout";
import NoItemsLayout from "../layouts/NoItemsLayout";
import NoOrdersLayout from "../layouts/NoOrdersLayout";
import OrderedItemLayout from "../layouts/OrderedItemLayout";
import { ordersGetRequest } from "../redux/ordersSlice";

function OrdersPage() {
  const orders = useSelector((state) => state.orders);

  const makeAuthRequest = useMakeAuthRequest();
  // fetching orders ono render
  useEffect(() => {
    makeAuthRequest(orders, ordersGetRequest);
  }, [orders]);

  return (
    <>
      {orders.status === reducerStatus.idle && <NoItemsLayout />}

      {orders.status === reducerStatus.pending && <LoadingLayout />}

      {orders.status === reducerStatus.rejected && <ErrorLayout />}

      {(orders.status === reducerStatus.fulfilled) &
      (orders.orders.length > 0) ? (
        <>
          {orders.orders.map((item) => {
            return <OrderedItemLayout order={item} />;
          })}
        </>
      ) : (
        <NoOrdersLayout />
      )}
    </>
  );
}

export default OrdersPage;
