import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import reducerStatus from "../assets/ReducerStatus";
import AuthContext from "../context/AuthContextProvider";

const useAutoLogin = () => {
  const user = useSelector((state) => state.users);
  const { refreshAuth, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (
      user.status === reducerStatus.fulfilled &&
      user.users._id &&
      !isLoggedIn
    ) {
      makRefreshRequest();
    }
  }, [user]);

  const makRefreshRequest = async () => {
    await refreshAuth();
  };
};

export default useAutoLogin;

// note : This custoom hook calls refreshAuth function upon sucessful user creation and as a result the user is automatically logged in
