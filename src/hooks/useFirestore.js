import { useEffect, useReducer, useState } from 'react';
import { projectFirestore, timestamp } from '../config/firebase';

const REQUEST_START = 'REQUEST_START';
const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
const REQUEST_FAILURE = 'REQUEST_FAILURE';

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
    case REQUEST_SUCCESS:
      return {
        ...state,
        isPending: false,
        isSuccess: true,
        error: null,
        document: action.payload,
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
  // @ts-ignore
  const [isCancelled, setIsCancelled] = useState(false);
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const collectionRef = projectFirestore.collection(collection);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      // @ts-ignore
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    // @ts-ignore
    dispatch({ type: REQUEST_START });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const documentRef = await collectionRef.add({ ...document, createdAt });

      dispatchIfNotCancelled({
        type: REQUEST_SUCCESS,
        payload: documentRef,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };

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
