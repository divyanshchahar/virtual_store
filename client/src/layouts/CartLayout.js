import useOperateCart from "../hooks/useOperateCart";
import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import { useSelector } from "react-redux";
import { ordersPostRequest } from "../redux/ordersSlice";
import { cartPutRequest, cartDeleteRequest } from "../redux/cartSlice";

function CartLayout({ cartData }) {
  const orders = useSelector((state) => state.orders.orders);
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.users.users?._id);

  const { addItem, removeItem } = useOperateCart();
  const makeAuthRequest = useMakeAuthRequest();

  const placeOrder = () => {
    const products = cartData.map((item) => {
      return { productId: item._id, qty: item.qty };
    });

    const ordersBody = {
      customerId: userId,
      products: [...products],
    };

    makeAuthRequest(orders, ordersPostRequest, ordersBody);
    makeAuthRequest(cart, cartDeleteRequest);
  };

  return (
    <>
      <h1 className="text-center mt-5">Cart</h1>
      {cartData.map((item) => {
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
                    item[0] !== "images" &&
                    item[0] !== "qty"
                  ) {
                    return <p>{`${item[0]} : ${item[1]}`}</p>;
                  }
                })}
                <h6>{`Price: $ ${item.price}`}</h6>

                <div className="btn-group align-items-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => addItem(item._id)}
                  >
                    <i class="bi bi-bag-plus"></i>
                  </button>

                  <button
                    className="btn btn-primary"
                    onClick={() => removeItem(item._id)}
                  >
                    <i class="bi bi-bag-dash"></i>
                  </button>
                </div>

                <p>{`Qty: ${item.qty}`}</p>

                <h4>{`Subtotal: $ ${(item.qty * item.price).toFixed(2)}`}</h4>
              </div>
            </div>
          </div>
        );
      })}

      <div className="container-fluid p-3">
        <div className="d-flex border p-3">
          <h5>{`Total : $ ${cartData.reduce((total, cartItem) => {
            return total + cartItem.qty * cartItem.price;
          }, 0)}`}</h5>
        </div>
      </div>
      <div className="d-grid p-3">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => {
            placeOrder();
          }}
        >
          Buy Now
        </button>
      </div>
    </>
  );
}

export default CartLayout;
