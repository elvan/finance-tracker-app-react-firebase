import { createContext } from 'react';

export const initialAuth = {
  user: null,
  authIsReady: false,
};

export const AuthContext = createContext(initialAuth);
