import { useSelector, useDispatch } from "react-redux";
import { ordersGetRequest } from "../redux/ordersSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import NoOrdersLayout from "../layouts/NoOrdersLayout";
import OrderedItemLayout from "../layouts/OrderedItemLayout";
import reducerStatus from "../assets/ReducerStatus";
import NoItemsLayout from "../layouts/NoItemsLayout";
import LoadingLayout from "../layouts/LoadingLayout";
import ErrorLayout from "../layouts/ErrorLayout";

function OrdersPage() {
  const selectedUser = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  // GETTING ORDERS ON RENDER
  useEffect(() => {
    const getOrders = async () => {
      try {
        if (isAuthenticated && !isLoading) {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:orders",
            },
          });

          dispatch(
            ordersGetRequest({
              acessToken: acessToken,
              customerId: selectedUser._id,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  let filteredProductIds = []; // to hold list of productIds in order

  let processedData = []; // to hold final dataset

  if (orders.length > 0 && typeof orders === "object") {
    // populating productIds
    orders.forEach((item) => {
      item.products.map((productItem) => {
        filteredProductIds.push(productItem.productId);
      });
    });
  }

  const product = useSelector((state) =>
    state.products.products.filter((item) =>
      filteredProductIds.includes(item._id)
    )
  );

  // generating final dataset
  if (orders.length > 0 && typeof orders === "object") {
    orders.forEach((orderItem) => {
      const temp = { _id: orderItem._id, createdAt: orderItem.createdAt }; // to hold a single instance of processed data
      const filteredProducts = [];
      // generating product details for final dataset (adding product qty from orders to final dataset)
      orderItem.products.forEach((orderProductItem) => {
        product.map((productItem) => {
          if (productItem._id === orderProductItem.productId) {
            filteredProducts.push({
              ...productItem,
              qty: orderProductItem.qty,
            });
          }
        });
      });
      temp.products = filteredProducts; // adding processed product data to an instance of processed data
      processedData.push(temp);
    });
  }

  return (
    <>
      {orders.status === reducerStatus.idle && <NoItemsLayout />}

      {orders.status === reducerStatus.pending && <LoadingLayout />}

      {orders.status === reducerStatus.rejected && <ErrorLayout />}

      {(orders.status === reducerStatus.fulfilled) &
      (orders.orders.length > 0) ? (
        <OrderedItemLayout processedData={processedData} />
      ) : (
        <NoOrdersLayout />
      )}
    </>
  );
}

export default OrdersPage;
