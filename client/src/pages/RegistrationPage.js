function RegistrationPage() {
  return (
    <div className="container mt-5">
      <div
        id="registration-form-carousel"
        className="carousel slide"
        data-bs-wrap="false"
      >
        <div className="carousel-inner">
          {/* USER DETAILS */}
          <div className="carousel-item active">
            <div className="card m-auto" style={{ maxWidth: "50rem" }}>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="input-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-name"
                    aria-describedby="name"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="input-email"
                    aria-describedby="e-mail"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-password"
                    aria-describedby="emailHelp"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="input-confirm-password"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="input-confirm-password"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* USER ADDRESS */}
          <div className="carousel-item">
            <div className="card">
              <div className="card-body">
                <h1>USER ADDRESS</h1>
              </div>
            </div>
          </div>
          {/* PAYMENT DETAILS */}
          <div className="carousel-item">
            <div className="card">
              <div className="card-body">
                <h1>PAYMENT DETAILS</h1>
              </div>
            </div>
          </div>
        </div>

        <div
          className="d-flex justify-content-center m-auto"
          style={{ maxWidth: "50rem" }}
        >
          <button
            className="btn - btn-primary m-5"
            data-bs-target="#registration-form-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="btn - btn-primary m-5"
            data-bs-target="#registration-form-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
