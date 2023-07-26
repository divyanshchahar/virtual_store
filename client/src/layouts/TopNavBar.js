import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

function TopNavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

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
                {isLoggedIn ? (
                  <button
                    className="nav-link"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="login" className="nav-link">
                    Login
                  </Link>
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
