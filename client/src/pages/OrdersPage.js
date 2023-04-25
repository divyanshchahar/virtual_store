import { useSelector, useDispatch } from "react-redux";

import { createOrdersApi } from "../redux/ordersSlice";

import { useAuth0 } from "@auth0/auth0-react";

import OrderedItemLayout from "../layouts/OrderedItemLayout";

import { getOrdersApi } from "../redux/ordersSlice";
import { useEffect } from "react";

import NoOrdersLayout from "../layouts/NoOrdersLayout";

function OrdersPage() {
  const selectedUser = useSelector((state) => state.users.users);
  const orders = useSelector((state) => state.orders.orders);

  const dispatch = useDispatch();

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

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

          const data = {
            customerId: selectedUser._id,
            acesstoken: acessToken,
          };

          console.log(data);

          dispatch(getOrdersApi(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  let filteredProductIds = []; // to hold list of productIds in order
  let processedData = []; // to hold final dataset

  if (orders.length > 0) {
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
  if (orders.length > 0) {
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
      {orders.length > 0 ? (
        <OrderedItemLayout processedData={processedData} />
      ) : (
        <NoOrdersLayout />
      )}
    </>
  );
}

export default OrdersPage;
