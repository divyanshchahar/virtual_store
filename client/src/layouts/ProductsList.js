import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { useEffect } from "react";

function ProductsList() {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  return (
    <>
      {products.status === "idle" && (
        <div className="container m-auto my-5">
          <h1>No products to display</h1>
        </div>
      )}

      {products.status === "pending" && (
        <div className="container m-auto my-5" style={{ width: "fit-content" }}>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {products.status === "rejected" && (
        <div className="container m-auto my-5">
          <h3>{products.error}</h3>
        </div>
      )}

      {products.status === "sucess" && (
        <div className="container d-flex justify-content-around flex-wrap gap-3 p-3">
          {products.products.map((item) => {
            return (
              <div className="card" style={{ width: "15rem" }} key={item._id}>
                <img
                  src={item.images[0]}
                  className="card-image-top"
                  alt={`${item.name}`}
                />
                <div className="card-body">
                  <p className="card-text">{item.name}</p>
                  <div className="btn-group">
                    <button className="btn btn-primary">Add to Cart</button>
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default ProductsList;
