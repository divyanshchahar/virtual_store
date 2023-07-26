import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import LogInFormLayout from "../layouts/LogInFormLayout";

function RouteProtector({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? children : <LogInFormLayout />}</>;
}

export default RouteProtector;
