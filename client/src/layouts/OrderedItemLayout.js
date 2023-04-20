function OrderedItemLayout({ processedData }) {
  return (
    <>
      {processedData.map((item) => {
        // console.log(processedData);
        return (
          <div className="card mt-5 mx-3">
            {/* ORDER ID AND DATE */}
            <div className="card-header">
              <p>{`Order ID: ${item._id}`}</p>
              <p>{`Ordered On: ${Date(item.createdAt)}`}</p>
            </div>

            {/* PRODUCT DETAILS */}
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

            {/* TOTAL */}
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
    </>
  );
}

export default OrderedItemLayout;
