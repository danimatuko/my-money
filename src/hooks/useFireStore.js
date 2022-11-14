import { useEffect, useReducer, useState } from "react";
import { firestore, timestamp } from "../firebase/config";

const initialState = {
  document: null,
  isPending: false,
  error: false,
  success: false,
};

const firestoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFireStore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = firestore.collection(collection);

  const safeDispatch = (action) => {
    if (!isCancelled) {
      dispatch({
        type: action.type,
        payload: action.payload,
      });
    }
  };

  const addDocument = async (doc) => {
    try {
      const createdAt = timestamp.fromDate(new Date());
      const transaction = await ref.add({ ...doc, createdAt });
      safeDispatch({
        type: "ADD_TRANSACTION",
        payload: transaction,
      });
      console.log("Document written with ID: ", doc.uid);
    } catch (error) {
      safeDispatch({
        type: "ERROR",
        payload: error,
      });
      console.error("Error adding document: ", error);
    }
  };

  const deleteDocument = async (id) => {
    try {
      await ref.doc(id).delete();
      safeDispatch({
        type: "DELETE_TRANSACTION",
      });
      console.log("Document written with ID: ", id);
    } catch (error) {
      safeDispatch({
        type: "ERROR",
        payload: error,
      });
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
