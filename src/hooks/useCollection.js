import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

const useCollection = (collection) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = firestore.collection(collection);

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
  }, [collection]);

  return {
    documents,
    error,
  };
};
