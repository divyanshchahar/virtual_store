import { useSelector, useDispatch } from "react-redux";

import { createOrdersApi } from "../redux/ordersSlice";

import { useAuth0 } from "@auth0/auth0-react";

import OrderedItemLayout from "../layouts/OrderedItemLayout";

const putOrder = {
  customerId: "64358dc3bc3d299a15ec28a4",
  products: [
    {
      productId: "64254b41e4f8dae9211a1579",
      qty: 3,
    },
    {
      productId: "64254b41e4f8dae9211a1578",
      qty: 2,
    },
  ],
};

const orders = [
  {
    _id: "oid1",
    cid: "cid1",
    date: new Date("1-1-2023"),
    products: [
      { pId: "64254b41e4f8dae9211a1579", qty: 3 },
      { pId: "64254b41e4f8dae9211a1578", qty: 2 },
    ],
  },
  {
    _id: "oid2",
    cid: "cid1",
    date: new Date("1-2-2023"),
    products: [
      { pId: "64254b41e4f8dae9211a1579", qty: 3 },
      { pId: "64254b41e4f8dae9211a1578", qty: 2 },
    ],
  },
];

function OrdersPage() {
  let productIds = []; // to hold list of productIds in order
  let processedData = []; // to hold final dataset

  // populating productIds
  orders.forEach((item) => {
    item.products.map((productItem) => {
      productIds.push(productItem.pId);
    });
  });

  const product = useSelector((state) =>
    state.products.products.filter((item) => productIds.includes(item._id))
  );

  // generating final dataset
  orders.forEach((orderItem) => {
    const temp = { _id: orderItem._id, date: orderItem.date }; // to hold a single instance of processed data
    const filteredProducts = [];

    // generating product details for final dataset (adding product qty from orders to final dataset)
    orderItem.products.forEach((orderProductItem) => {
      product.map((productItem) => {
        if (productItem._id === orderProductItem.pId) {
          filteredProducts.push({ ...productItem, qty: orderProductItem.qty });
        }
      });
    });

    temp.products = filteredProducts; // adding processed product data to an instance of processed data
    processedData.push(temp);
  });

  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();

  return (
    <>
      <OrderedItemLayout processedData={processedData} />
      <button
        className="btn btn-primary"
        onClick={async () => {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:orders",
            },
          });
          const data = { orderData: putOrder, acesstoken: acessToken };
          dispatch(createOrdersApi(data));
        }}
      >
        Buy Now
      </button>
    </>
  );
}

export default OrdersPage;

// TODO:
// 1. Remove hardcoded values i.e. orders array
