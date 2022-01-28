import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../config/firebase';

// Custom hook to get data from firestore in realtime
export const useCollection = (collection, queryRef = [], orderByRef = []) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');

  // If we dont use a ref, infinite loop will occur
  // 'queryRef' is an array and is "different" on each render
  const query = useRef(queryRef).current;
  const orderBy = useRef(orderByRef).current;

  // Effect to fetch data from firestore
  useEffect(() => {
    // Create reference to firestore collection
    let collectionRef = projectFirestore.collection(collection);

    if (query) {
      // @ts-ignore
      collectionRef = collectionRef.where(...query);
    }

    if (orderBy) {
      // @ts-ignore
      collectionRef = collectionRef.orderBy(...orderBy);
    }

    // Subscribe to collectionRef and set documents state
    const unsubscribe = collectionRef.onSnapshot(
      (snapshot) => {
        // Map snapshot to array of documents
        const documents = snapshot.docs.map((docSnapshot) => ({
          ...docSnapshot.data(),
          id: docSnapshot.id,
        }));

        // @ts-ignore
        setDocuments(documents);
      },
      (error) => {
        // @ts-ignore
        setError(error.message);
      }
    );

    // Unsubscribe from the collection when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [collection, query, orderBy]);

  // Return the documents and the error
  return { documents, error };
};
