import { useState, useContext } from "react";
import AuthContext from "../context/AuthContextProvider";

function LogInFormLayout() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { login } = useContext(AuthContext);

  return (
    <>
      <div className="mt-5 w-50 m-auto">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="d-grid gap-2 mt-3">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => login(email, password)}
          >
            Log In
          </button>
        </div>
      </div>
    </>
  );
}

export default LogInFormLayout;
