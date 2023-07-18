import { createContext, useState } from "react";
import apiEndPoints from "../assets/api_endpoints";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState();
  const [lastUpdated, setLastUpdated] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(apiEndPoints.refresh, {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          const json = await response.json();

          setAuth(json.acessToken);
          setLastUpdated(Date.now());
          setIsLoggedIn(true);

          resolve(json.acessToken);
        } else {
          reject(response.ok);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(apiEndPoints.login, {
          method: "PUT",
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const json = response.json();

          setAuth(json.acessToken);
          setLastUpdated(Date.now());

          resolve(json.acessToken);
        } else {
          reject();
        }
      } catch (error) {}
    });
  };

  return (
    <AuthContext.Provider
      value={{ auth, lastUpdated, isLoggedIn, login, refreshAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
