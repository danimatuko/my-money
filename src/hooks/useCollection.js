import { useEffect, useRef, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (collection, _query, _orederBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  /* 
    if we don't use ref it will cause an infinite loop in useEffect
    _query is an array and it's diffrent in every funtion call
  */
  const query = useRef(_query).current;
  const orederBy = useRef(_orederBy).current;

  useEffect(() => {
    let ref = firestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orederBy) {
      ref = ref.orderBy(...orederBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) =>
          results.push({ ...doc.data(), id: doc.id })
        );

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );
    // unsubscribe to unmount
    return () => unsubscribe();
  }, [collection, query, orederBy]);

  return {
    documents,
    error,
  };
};
