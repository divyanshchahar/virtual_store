import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reducerStatus from "../assets/ReducerStatus";
import ErrorLayout from "../layouts/ErrorLayout";
import LoadingLayout from "../layouts/LoadingLayout";
import NoItemsLayout from "../layouts/NoItemsLayout";
import ProductsListLayout from "../layouts/ProductsListLayout";
import { getProductsApi } from "../redux/productsSlice";

function ProductsListPage() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  // rendering products on page load
  useEffect(() => {
    dispatch(getProductsApi());
  }, []);

  return (
    <>
      {products.status === reducerStatus.idle && <NoItemsLayout />}

      {products.status === reducerStatus.pending && <LoadingLayout />}

      {products.status === reducerStatus.rejected && <ErrorLayout />}

      {products.status === reducerStatus.fulfilled && (
        <ProductsListLayout products={products.products} />
      )}
    </>
  );
}

export default ProductsListPage;
