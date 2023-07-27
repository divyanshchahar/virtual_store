function ErrorLayout() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <i
          className="bi bi-exclamation-circle"
          style={{ fontSize: "10rem" }}
        ></i>
      </div>
      <div className="mx-5">
        <p className="text-center fs-1">Oops! Something went Wrong</p>
      </div>
    </>
  );
}

export default ErrorLayout;
