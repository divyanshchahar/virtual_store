import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SingleProductLayout from "../layouts/SingleProductLayout";
import NoItemsLayout from "../layouts/NoItemsLayout";

function SingleProductPage() {
  const { productId } = useParams();

  const product = useSelector((state) =>
    state.products.products.find((item) => item._id === productId)
  );

  return (
    <>
      {product ? <SingleProductLayout product={product} /> : <NoItemsLayout />}
    </>
  );
}

export default SingleProductPage;
