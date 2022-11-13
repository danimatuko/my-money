import { createContext, useEffect, useReducer } from "react";
import { firebaseAuth } from "../firebase/config";

export const authContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "AUTH_IS_READY":
      return {
        ...state,
        authIsReady: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      dispatch({
        type: "AUTH_IS_READY",
        payload: user,
      });

      unsubscribe();
    });
  }, []);

  console.log(state);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
