import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response.user);

      if (!response) {
        throw new Error("Could not complete signup");
      }

      await response.user.updateProfile({ displayName: displayName });

      dispatch({
        type: "LOGIN",
        payload: response.user,
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
    signup,
  };
};
