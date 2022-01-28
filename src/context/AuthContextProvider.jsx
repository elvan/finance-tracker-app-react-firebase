import { useEffect, useReducer } from 'react';
import { projectAuth } from '../config/firebase';
import { AuthContext, initialAuth } from './authContext';
import { authReducer } from './authReducer';

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
