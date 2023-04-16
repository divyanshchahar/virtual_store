import { useSelector, useDispatch } from "react-redux";

import { createOrdersApi } from "../redux/ordersSlice";

import { useAuth0 } from "@auth0/auth0-react";

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

function OrderHistory() {
  let productIds = [];
  let processedData = [];

  orders.forEach((item) => {
    item.products.map((productItem) => {
      productIds.push(productItem.pId);
    });
  });

  const product = useSelector((state) =>
    state.products.products.filter((item) => productIds.includes(item._id))
  );

  orders.forEach((orderItem) => {
    const temp = { _id: orderItem._id, date: orderItem.date };
    const filteredProducts = [];

    orderItem.products.forEach((orderProductItem) => {
      product.map((productItem) => {
        if (productItem._id === orderProductItem.pId) {
          filteredProducts.push({ ...productItem, qty: orderProductItem.qty });
        }
      });
    });
    temp.products = filteredProducts;
    processedData.push(temp);
  });

  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();

  return (
    <>
      {processedData.map((item) => {
        return (
          <div className="card mt-5 mx-3">
            <div className="card-header">
              <p>{`Order ID: ${item._id}`}</p>
              <p>{`Ordered On: ${item.date.toDateString()}`}</p>
            </div>
            <div className="card-body">
              {item.products.map((renderItem) => {
                return (
                  <div className="d-flex flex-wrap gap-5 mb-5 p-5">
                    <img
                      src={renderItem.images[0]}
                      alt={renderItem.name}
                      style={{ maxWidth: "25rem" }}
                    />

                    <div style={{ maxWidth: "55rem" }}>
                      <h3>{renderItem.name}</h3>
                      <p>{`Qty: $ ${renderItem.qty}`}</p>
                      <h6>{`Price: $ ${renderItem.price}`}</h6>
                      <h5>{`Subtotal: $ ${
                        renderItem.price * renderItem.qty
                      }`}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="card-footer">
              <h6>
                {`Total : $ ${item.products.reduce((total, totalItem) => {
                  return total + totalItem.price * totalItem.qty;
                }, 0)}`}
              </h6>
            </div>
          </div>
        );
      })}
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

export default OrderHistory;

// TODO:
// 1. Remove hardcoded values i.e. orders array
