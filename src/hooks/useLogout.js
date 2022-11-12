import { useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

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

      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  return {
    error,
    isPending,
    logout,
  };
};
