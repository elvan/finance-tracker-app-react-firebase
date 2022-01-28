import { createContext, useEffect, useReducer } from 'react';
import { projectAuth } from '../config/firebase';
import { authReducer } from './authReducer';
import { AUTH_IS_READY } from './constants';

const initialAuth = {
  user: null,
  authIsReady: false,
};

export const AuthContext = createContext(initialAuth);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged((user) => {
      // @ts-ignore
      dispatch({ type: AUTH_IS_READY, payload: user });
      unsubscribe();
    });
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
