import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function SingleProductPage() {
  const { productId } = useParams();

  const product = useSelector((state) =>
    state.products.products.find((item) => item._id === productId)
  );

  console.log(Object.entries(product));

  return (
    <>
      <div className="container p-5">
        <div className="d-flex justify-content-center flex-wrap gap-5">
          {/* IMAGE CAROUSEL */}
          <div
            id="carouselExample"
            className="carousel slide"
            style={{ width: "25rem" }}
          >
            <div className="carousel-inner">
              {product.images.map((item) => {
                return (
                  <div className="carousel-item active">
                    <img src={item} className="d-block w-100" alt="..." />
                  </div>
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
          {/* PRODUCT DETAILS */}
          <div>
            <h3>{product.name}</h3>
            {Object.entries(product).map((item) => {
              if (
                item[0] !== "name" &&
                item[0] !== "price" &&
                item[0] !== "_id" &&
                item[0] !== "images"
              ) {
                return <p>{`${item[0]}: ${item[1]}`}</p>;
              }
            })}
            <p>{`$ ${product.price}`}</p>

            <div className="btn-group">
              <button className="btn btn-primary">Add to Cart</button>
              <button className="btn btn-primary">Remove from Cart</button>
            </div>

            <div className="mt-2">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductPage;
