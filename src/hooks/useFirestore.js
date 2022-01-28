import { useEffect, useReducer, useState } from 'react';
import { projectFirestore } from '../config/firebase';

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    default:
      break;
  }
};

export const useFirestore = (collection) => {
  // @ts-ignore
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const collectionRef = projectFirestore.collection(collection);

  const addDocument = async (document) => {};

  const deleteDocument = async (id) => {};

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return {
    response,
    addDocument,
    deleteDocument,
  };
};
