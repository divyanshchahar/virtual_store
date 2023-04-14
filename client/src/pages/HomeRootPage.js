import { Outlet, Link } from "react-router-dom";

function HomeRootPage() {
  return (
    <>
      <nav className="navbar navbar-expand-md bg-body-tertiary">
        <div className="container-fluid">
          {/* BRANDING */}
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          {/* BUTTON GROUP`` */}
          <div className="order-md-last">
            <button className="btn position-relative">
              <i className="bi bi-cart-fill" style={{ fontSize: "2rem" }} />
              <span class="position-absolute top-25 start-50  badge rounded-pill bg-danger">
                99+
                <span class="visually-hidden">unread messages</span>
              </span>
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
            <form
              className=" d-flex m-auto gap-2 mt-2 flex-grow-1"
              role="search"
            >
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
                  <a className="nav-link" href="#">
                    Login/Logout
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Cart
                  </a>
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
      <Outlet />
    </>
  );
}

export default HomeRootPage;
