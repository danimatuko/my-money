import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const response = await firebaseAuth.signOut();
      console.log(response);

      dispatch({
        type: "LOGOUT",
      });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return {
    error,
    isPending,
    logout,
  };
};
