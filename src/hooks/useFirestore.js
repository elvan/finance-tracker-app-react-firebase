// @ts-nocheck

import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../config/firebase';

const REQUEST_START = 'REQUEST_START';
const REQUEST_FAILURE = 'REQUEST_FAILURE';
const ADDED_DOCUMENT = 'ADDED_DOCUMENT';
const DELETED_DOCUMENT = 'DELETED_DOCUMENT';

const initialState = {
  isPending: false,
  isSuccess: false,
  error: null,
  document: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isPending: true,
        isSuccess: false,
        error: null,
        document: null,
      };
    case ADDED_DOCUMENT:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        error: null,
        document: action.payload,
      };
    case DELETED_DOCUMENT:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        error: null,
        document: null,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        isPending: false,
        isSuccess: false,
        error: action.payload,
        document: null,
      };
    default:
      break;
  }
};

export const useFirestore = (collection) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const collectionRef = projectFirestore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    dispatch({ type: REQUEST_START });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const documentRef = await collectionRef.add({ ...document, createdAt });

      dispatchIfNotCancelled({
        type: ADDED_DOCUMENT,
        payload: documentRef,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };

  // Delete a specific document by id
  const deleteDocument = async (id) => {
    dispatch({ type: REQUEST_START });

    try {
      await collectionRef.doc(id).delete();

      dispatchIfNotCancelled({ type: DELETED_DOCUMENT });
    } catch (error) {
      dispatchIfNotCancelled({
        type: REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };

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
