import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { resetUser } from "../redux/usersSlice";
import { resetCart } from "../redux/cartSlice";
import { resetOrders } from "../redux/ordersSlice";
import { useDispatch } from "react-redux";

function TopNavBar() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        {/* BRANDING */}
        <Link className="navbar-brand" to="/">
          <i class="bi bi-shop" style={{ fontSize: "2rem" }}></i>
        </Link>

        {/* BUTTON GROUP`` */}
        <div className="order-md-last">
          <button
            className="btn position-relative"
            onClick={() => {
              navigate("cart");
            }}
          >
            <i className="bi bi-cart-fill" style={{ fontSize: "2rem" }} />
          </button>

          <button
            className="navbar-toggler m-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-collapse-container"
            aria-controls="navbar-collapse-container"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* SEARCH BAR */}
        <div className="container-fluid">
          <form className=" d-flex m-auto gap-2 mt-2 flex-grow-1" role="search">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>

        {/* COLLAPSABLE ITEMS */}
        <div>
          <div
            className="collapse navbar-collapse"
            id="navbar-collapse-container"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                {isAuthenticated ? (
                  <button
                    className="nav-link"
                    onClick={() => {
                      dispatch(resetUser());
                      dispatch(resetCart());
                      dispatch(resetOrders());

                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      });
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="nav-link"
                    onClick={() => loginWithRedirect()}
                  >
                    Login
                  </button>
                )}
              </li>

              <li className="nav-item">
                <Link to="orders" className="nav-link">
                  Orders
                </Link>
              </li>

              <li className="nav-item">
                <Link to="account" className="nav-link">
                  Account
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;
