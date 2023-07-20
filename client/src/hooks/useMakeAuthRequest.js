import { useContext } from "react";
import AuthContext from "../context/AuthContextProvider";
import { useDispatch } from "react-redux";

function useMakeAuthRequest() {
  const { auth, refreshAuth, lastUpdated } = useContext(AuthContext);
  const dispatch = useDispatch();

  return async (state, reducer, body = null) => {
    try {
      const tokenAge = (Date.now() - lastUpdated) / (1000 * 60);

      if (
        state.responseCode === 403 ||
        !auth ||
        tokenAge > 13 ||
        !tokenAge ||
        !lastUpdated
      ) {
        const newAuth = await refreshAuth();

        if (body) {
          dispatch(reducer({ newAuth, body }));
        } else {
          dispatch(reducer(newAuth));
        }
      } else {
        if (body) {
          dispatch(reducer({ auth, body }));
        } else {
          dispatch(reducer(auth));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
}

export default useMakeAuthRequest;
