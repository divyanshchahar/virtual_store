import { useEffect, useState } from "react";
import {
  createUsersApi,
  getUsersApi,
  updateUserApi,
  deleteUserApi,
  resetUser,
} from "../redux/usersSlice";
import { resetCart } from "../redux/cartSlice";
import { resetOrders } from "../redux/ordersSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import validateRegistrationForm from "../utils/validateRegistrationForm";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  const selectedUser = useSelector((state) => state.users.users);

  // loading user on page load
  useEffect(() => {
    const setUserOnPageLoad = async () => {
      try {
        if (isAuthenticated && !isLoading) {
          const acessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.REACT_APP_AUDIENCE,
              scope: "write:users",
            },
          });
          const authId = user.sub;
          const data = { authId, acessToken };
          dispatch(getUsersApi(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    setUserOnPageLoad();
  }, [user]);

  // populating form
  useEffect(() => {
    try {
      if (Object.keys(selectedUser).length > 0) {
        setName(selectedUser.name);
        setEmail(selectedUser.email);
        setHouse(selectedUser.address.house);
        setStreet(selectedUser.address.street);
        setCity(selectedUser.address.city);
        setPin(selectedUser.address.pin);
        setCountry(selectedUser.address.country);
        setNameOnCard(selectedUser.payment.nameOnCard);
        setCardNo(selectedUser.payment.cardNo);
        setValidFrom(selectedUser.payment.validFrom);
        setValidUpto(selectedUser.payment.validUpto);
        setCvv(selectedUser.payment.cvv);
      }
    } catch (error) {}
  }, [selectedUser]);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [house, setHouse] = useState();
  const [street, setStreet] = useState();
  const [city, setCity] = useState();
  const [pin, setPin] = useState();
  const [country, setCountry] = useState();
  const [nameOnCard, setNameOnCard] = useState();
  const [cardNo, setCardNo] = useState();
  const [validFrom, setValidFrom] = useState();
  const [validUpto, setValidUpto] = useState();
  const [cvv, setCvv] = useState();

  const userData = {
    name,
    email,
    authId: user.sub,
    address: {
      house,
      street,
      city,
      pin,
      country,
    },
    payment: {
      cardNo,
      nameOnCard,
      validFrom,
      validUpto,
      cvv,
    },
  };

  // function to register new user (POST request)
  const registerUser = async () => {
    const alertShown = validateRegistrationForm(userData);

    if (!alertShown) {
      const acessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "write:users",
        },
      });

      dispatch(createUsersApi({ acessToken: acessToken, userData: userData }));
    }
  };

  // function to update user (PUT request)
  const updateUser = async () => {
    const alertShown = validateRegistrationForm(userData);

    if (!alertShown) {
      const acessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "write:users",
        },
      });

      dispatch(updateUserApi({ acessToken: acessToken, userData: userData }));
    }
  };

  // function to execute delete operation (DELETE request)
  const deleteUser = async () => {
    const acessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
        scope: "write:users",
      },
    });

    dispatch(
      deleteUserApi({
        acessToken: acessToken,
        id: selectedUser._id,
      })
    );

    dispatch(resetCart());
    dispatch(resetOrders());
    dispatch(resetUser());

    logout({
      logoutParams: { returnTo: window.location.origin },
    });
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
                <h5 classname="card-title">User Details</h5>
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
                <h5 classname="card-title">Address</h5>
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
                <h5 classname="card-title">Payment Details</h5>
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
                    value={cardNo}
                    onChange={(e) => setCardNo(e.target.value)}
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
                      value={validFrom}
                      onChange={(e) => setValidFrom(e.target.value)}
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
                      value={validUpto}
                      onChange={(e) => setValidUpto(e.target.value)}
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

            <div
              className="d-grid mx-auto mt-3 gap-3"
              style={{ maxWidth: "50rem" }}
            >
              {selectedUser?._id ? (
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={() => {
                    updateUser();
                  }}
                >
                  Update Details
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={() => {
                    registerUser();
                  }}
                >
                  Register Details
                </button>
              )}

              {selectedUser?._id && (
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={() => {
                    deleteUser();
                  }}
                >
                  Delete User
                </button>
              )}
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
