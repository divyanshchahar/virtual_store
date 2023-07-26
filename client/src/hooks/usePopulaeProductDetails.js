import { useSelector } from "react-redux";

function usePopulaeProductDetails(orderData) {
  const products = useSelector((state) => state.products.products);

  const productIds = orderData.products.map((item) => item.productId);

  const filteredProducts = products.filter((item) =>
    productIds.includes(item._id)
  );

  let processedData = [];

  filteredProducts.forEach((filteredProductItem) => {
    orderData.products.map((orderItem) => {
      if (orderItem.productId === filteredProductItem._id) {
        processedData.push({ ...filteredProductItem, qty: orderItem.qty });
      }
    });
  });

  return processedData;
}

export default usePopulaeProductDetails;
