function NoItemsLayout() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <i className="bi bi-box2-fill" style={{ fontSize: "10rem" }}></i>
      </div>
      <p className="text-center fs-1">No items to display</p>
    </>
  );
}

export default NoItemsLayout;
