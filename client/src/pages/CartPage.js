import { useSelector } from "react-redux";

function CartPage() {
  const cart = {
    _id: null,
    products: [
      { pId: "64254b41e4f8dae9211a1579", qty: 3 },
      { pId: "64254b41e4f8dae9211a1578", qty: 2 },
    ],
  };

  const productIds = cart.products.map((item) => item.pId);

  const products = useSelector((state) =>
    state.products.products.filter((item) => productIds.includes(item._id))
  );

  return (
    <>
      <h1 className="text-center mt-5">Cart</h1>
      {products.map((item) => {
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
                    item[0] !== "images"
                  ) {
                    return <p>{`${item[0]} : ${item[1]}`}</p>;
                  }
                })}
                <h6>{`Price: $ ${item.price}`}</h6>
                <div className="btn-group align-items-center">
                  <button className="btn btn-primary">+</button>
                  <button className="btn btn-primary">-</button>
                </div>
                <p>{`Qty: ${
                  cart.products.find((cartItem) => cartItem.pId === item._id)
                    .qty
                }`}</p>
                <h4>
                  {`Subtotal: $ ${(
                    cart.products.find((cartItem) => cartItem.pId === item._id)
                      .qty * item.price
                  ).toFixed(2)}`}
                </h4>
              </div>
            </div>
          </div>
        );
      })}
      <div className="container-fluid p-3">
        <div className="d-flex border p-3">
          <h5>{`Total : $ ${cart.products.reduce((total, cartItem) => {
            return (
              total +
              cartItem.qty *
                products.find((productItem) => productItem._id === cartItem.pId)
                  .price
            );
          }, 0)}`}</h5>
        </div>
      </div>
    </>
  );
  //
}
export default CartPage;

// TODO
// 1. Integrate CartSlice
// 2. Remove hard codded values isFormElement.e cart array
