import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProductsList() {
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  const navigate = useNavigate();

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
              <div
                className="card text-center"
                style={{ width: "15rem" }}
                key={item._id}
              >
                <div className="ratio ratio-1x1">
                  <img
                    src={item.images[0]}
                    className="card-image-top object-fit-contain"
                    alt={`${item.name}`}
                    onClick={() => {
                      navigate(`products/${item._id}`);
                    }}
                  />
                </div>

                <div className="card-body">
                  <p className="card-text">
                    {item.name.length > 25
                      ? `${item.name.substring(0, 20)}...`
                      : item.name}
                  </p>

                  <div className="btn-group">
                    <button className="btn btn-primary">
                      <i class="bi bi-bag-plus"></i>
                    </button>
                    <button className="btn btn-primary">
                      <i class="bi bi-bag-dash"></i>
                    </button>
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
