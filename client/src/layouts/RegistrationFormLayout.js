import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../context/AuthContextProvider";
import useAutoLogin from "../hooks/useAutoLogin";
import useMakeAuthRequest from "../hooks/useMakeAuthRequest";
import {
  usersDeleteRequest,
  usersGetRequest,
  usersPostRequest,
  usersPutRequest,
} from "../redux/usersSlice";
import validateRegistrationForm from "../utils/validateRegistrationForm";
import useAutoLogout from "../hooks/useAutoLogout";

function RegistrationFormLayout() {
  const user = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  const makeAuthRequest = useMakeAuthRequest();
  const { logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: {
      house: "",
      street: "",
      city: "",
      pin: "",
      country: "",
    },
    payments: {
      nameOnCard: "",
      cardNo: "",
      validFrom: "",
      validUpto: "",
      cvv: "",
    },
  });

  // fetching user on page load
  useEffect(() => {
    makeAuthRequest(user, usersGetRequest);
  }, []);

  // fetching user on page load
  useEffect(() => {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      address: { ...user.address },
      payments: { ...user.payments },
    });
  }, [user]);

  // auto login on sucessful user creation
  useAutoLogin();

  // auto log out on sucessful user deletion
  useAutoLogout();

  // function to register new user (POST request)
  const registerUser = async () => {
    const alertShown = validateRegistrationForm(formData);

    if (!alertShown) {
      dispatch(usersPostRequest({ body: formData }));
    }
  };

  // function to update user (PUT request)
  const updateUser = async () => {
    const alertShown = validateRegistrationForm(formData);

    if (!alertShown) {
      makeAuthRequest(user, usersPutRequest, formData);
    }
  };

  // function to execute delete operation (DELETE request)
  const deleteUser = () => {
    makeAuthRequest(user, usersDeleteRequest);
    // logout();
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        {/* USER DETAILS */}
        <div className="container rounded border">
          <h3> User Details</h3>
          <div className="mb-3">
            <label htmlFor="input-name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="input-name"
              aria-describedby="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div className="container rounded border mt-3">
          <h3>Address</h3>

          <div className="mb-3">
            <label htmlFor="input-house-number" className="form-label">
              House/Apartment No
            </label>
            <input
              type="text"
              className="form-control"
              id="input-house-number"
              aria-describedby="house-number"
              value={formData.address.house}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    house: e.target.value,
                  },
                })
              }
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
              value={formData.address.street}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    street: e.target.value,
                  },
                })
              }
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
              value={formData.address.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    city: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="input-pin" className="form-label">
              PIN Code
            </label>
            <input
              type="text"
              className="form-control"
              id="input-pin"
              aria-describedby="pin-code"
              value={formData.address.pin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    pin: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="mb-3">
            <label htmlFor="input-country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="input-country"
              aria-describedby="country"
              value={formData.address.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    country: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        {/* PAYMENT DETAILS */}
        <div className="container border rounded mt-3">
          <h3>Payment Details</h3>

          <div className="mb-3">
            <label htmlFor="input-name-on-card" className="form-label">
              Name on card
            </label>
            <input
              type="text"
              className="form-control"
              id="input-name-on-card"
              aria-describedby="name on card"
              value={formData.payments.nameOnCard}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payments: {
                    ...formData.payments,
                    nameOnCard: e.target.value,
                  },
                })
              }
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
              value={formData.payments.cardNo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payments: {
                    ...formData.payments,
                    cardNo: e.target.value,
                  },
                })
              }
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
                value={formData.payments.validFrom}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payments: {
                      ...formData.payments,
                      validFrom: e.target.value,
                    },
                  })
                }
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
                value={formData.payments.validUpto}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    payments: {
                      ...formData.payments,
                      validUpto: e.target.value,
                    },
                  })
                }
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
              value={formData.payments.cvv}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payments: {
                    ...formData.payments,
                    cvv: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>

        <div className="d-grid mx-auto mt-3 gap-3">
          {user?._id ? (
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

          {user?._id && (
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
    </>
  );
}

export default RegistrationFormLayout;
