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
                    aria-describedby="password"
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
                    aria-describedby="confirm-password"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* USER ADDRESS */}
          <div className="carousel-item">
            <div className="card m-auto" style={{ maxWidth: "50rem" }}>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="input-house-number" className="form-label">
                    House/Apartment No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-house-number"
                    aria-describedby="house-number"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-street" className="form-label">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-street"
                    aria-describedby="street"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-city"
                    aria-describedby="city"
                  />

                  <div className="mb-3">
                    <label htmlFor="input-pin" className="form-label">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="input-pin"
                      aria-describedby="pin-code"
                    />

                    <div className="mb-3">
                      <label htmlFor="input-country" className="form-label">
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="input-country"
                        aria-describedby="country"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* PAYMENT DETAILS */}
          <div className="carousel-item">
            <div className="card m-auto" style={{ maxWidth: "50rem" }}>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="input-name-on-card" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-name-on-card"
                    aria-describedby="name on card"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="input-card" className="form-label">
                    Card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-card"
                    aria-describedby="card"
                  />
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label htmlFor="input-valid-from" className="form-label">
                      Valid From
                    </label>
                    <input
                      type="month"
                      className="form-control"
                      id="input-valid-from"
                      aria-describedby="valid-from"
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="input-valid-through" className="form-label">
                      Valid Through
                    </label>
                    <input
                      type="month"
                      className="form-control"
                      id="input-valid-through"
                      aria-describedby="valid-from"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="input-cvv" className="form-label">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-cvv"
                    aria-describedby="cvv"
                  />
                </div>
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
