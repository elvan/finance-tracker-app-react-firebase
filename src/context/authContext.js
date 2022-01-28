import { createContext, useReducer } from 'react';
import { authReducer } from './authReducer';

const initialAuth = {
  user: null,
};

export const AuthContext = createContext(initialAuth);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
