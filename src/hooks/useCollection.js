import { useEffect, useState } from 'react';
import { projectFirestore } from '../config/firebase';

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState('');

  // Effect to fetch data from firestore
  useEffect(() => {
    // Create reference to firestore collection
    const collectionRef = projectFirestore.collection(collection);

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
  }, [collection]);

  // Return the documents and the error
  return { documents, error };
};
