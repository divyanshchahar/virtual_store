function ErrorLayout() {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
        <i class="bi bi-exclamation-circle" style={{ fontSize: "10rem" }}></i>
      </div>
      <p className="text-center fs-1">Oops! Something went Wrong</p>
    </>
  );
}

export default ErrorLayout;
