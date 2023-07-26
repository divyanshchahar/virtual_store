import { useNavigate } from "react-router-dom";
import useOperateCart from "../hooks/useOperateCart";

function ProductsListLayout({ products }) {
  const navigate = useNavigate();
  const { addItem, removeItem } = useOperateCart();

  return (
    <div className="container d-flex justify-content-around flex-wrap gap-3 p-3">
      {products.map((item) => {
        return (
          <div
            className="card text-center"
            style={{ width: "15rem" }}
            key={item._id}
          >
            <img
              src={item.images[0]}
              className="card-image-top object-fit-contain"
              alt={`${item.name}`}
              style={{ height: "15rem" }}
              onClick={() => {
                navigate(`products/${item._id}`);
              }}
            />

            <div className="card-body">
              <p className="card-text">
                {item.name.length > 25
                  ? `${item.name.substring(0, 20)}...`
                  : item.name}
              </p>

              <div className="btn-group">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductsListLayout;
