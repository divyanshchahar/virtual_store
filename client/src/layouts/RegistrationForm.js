import { useState } from "react";

import { createUsers } from "../redux/usersSlice";

import { useAuth0 } from "@auth0/auth0-react";

import { useDispatch } from "react-redux";

import validateRegistrationForm from "../utils/validateRegistrationForm";

function RegistrationForm() {
  const dispatch = useDispatch();

  const { getAccessTokenSilently } = useAuth0();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [house, setHouse] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [pin, setPin] = useState();
  const [country, setCountry] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [cardNumber, setcardNumber] = useState();
  const [startMonth, setStartMonth] = useState();
  const [endMonth, setEndMonth] = useState();
  const [cvv, setCvv] = useState();

  const handleClick = async () => {
    const userData = {
      name,
      email,
      house,
      street,
      city,
      pin,
      country,
      cardNumber,
      nameOnCard,
      startMonth,
      endMonth,
      cvv,
    };

    const alertShown = validateRegistrationForm(userData);

    if (!alertShown) {
      const acessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "write:users",
        },
      });

      const data = { userData: userData, acessToken: acessToken };

      dispatch(createUsers(data));
    }
  };

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
                <h5 class="card-title">User Details</h5>
                <div className="mb-3">
                  <label htmlFor="input-name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-name"
                    aria-describedby="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* USER ADDRESS */}
          <div className="carousel-item">
            <div className="card m-auto" style={{ maxWidth: "50rem" }}>
              <div className="card-body">
                <h5 class="card-title">Address</h5>
                <div className="mb-3">
                  <label htmlFor="input-house-number" className="form-label">
                    House/Apartment No
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-house-number"
                    aria-describedby="house-number"
                    value={house}
                    onChange={(e) => setHouse(e.target.value)}
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
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
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
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
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
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
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
                <h5 class="card-title">Payment Details</h5>
                <div className="mb-3">
                  <label htmlFor="input-name-on-card" className="form-label">
                    Name on card
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="input-name-on-card"
                    aria-describedby="name on card"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
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
                    value={cardNumber}
                    onChange={(e) => setcardNumber(e.target.value)}
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
                      value={startMonth}
                      onChange={(e) => setStartMonth(e.target.value)}
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
                      value={endMonth}
                      onChange={(e) => setEndMonth(e.target.value)}
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
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="d-grid mx-auto mt-3" style={{ maxWidth: "50rem" }}>
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={() => {
                  handleClick();
                }}
              >
                Submit
              </button>
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

export default RegistrationForm;
