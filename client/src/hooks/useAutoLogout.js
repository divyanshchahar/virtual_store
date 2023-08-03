import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import reducerStatus from "../assets/ReducerStatus";
import AuthContext from "../context/AuthContextProvider";

const useAutoLogout = () => {
  const user = useSelector((state) => state.users);
  const { logout, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (
      user.status === reducerStatus.fulfilled &&
      !user.users._id &&
      isLoggedIn
    ) {
      logout();
    }
  }, [user]);
};

export default useAutoLogout;

// note : This custoom hook calls logout function upon sucessful user deletion
