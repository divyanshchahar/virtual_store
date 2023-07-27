function BreakingUILayout() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <i className="bi bi-bandaid-fill" style={{ fontSize: "10rem" }}></i>
      </div>
      <div className="mx-5">
        <p className="text-center fs-1">
          We ran into some issues while trying to display this page. Please head
          to the home and refresh.
        </p>
      </div>
    </>
  );
}

export default BreakingUILayout;
